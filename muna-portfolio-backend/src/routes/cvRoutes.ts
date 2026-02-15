import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { Profile } from "../models/Profile";
import { uploadToS3, deleteFromS3, isS3Configured, extractS3Key } from "../services/s3Service";

export const cvRouter = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename: cv-{timestamp}.{ext}
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || (file.mimetype.includes("word") ? ".docx" : ".pdf");
    cb(null, `cv-${uniqueSuffix}${ext}`);
  },
});

// File filter - allow PDFs and DOCX files
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    "application/msword", // .doc (legacy)
  ];
  
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF and Word document files (.pdf, .docx, .doc) are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

/**
 * @openapi
 * /api/cv:
 *   get:
 *     summary: Get the CV URL from the profile
 *     responses:
 *       200:
 *         description: CV URL returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cv: { type: string, nullable: true }
 *       404:
 *         description: No profile found
 *       500:
 *         description: Failed to load CV
 */
cvRouter.get("/", async (_req, res) => {
  try {
    const profile = await Profile.findOne({ order: [["id", "DESC"]] });
    if (!profile) {
      return res.status(404).json({ message: "No profile found" });
    }
    return res.json({ cv: profile.cv });
  } catch (err) {
    console.error("GET CV ERROR:", err);
    return res.status(500).json({ message: "Failed to load CV" });
  }
});

/**
 * @openapi
 * /api/cv/upload:
 *   post:
 *     summary: Upload a CV file and update the profile
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - cv
 *             properties:
 *               cv:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: CV uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *                 cv: { type: string }
 *       400:
 *         description: Bad request (no file or invalid file type)
 *       404:
 *         description: No profile found
 *       500:
 *         description: Failed to upload CV
 */
cvRouter.post("/upload", upload.single("cv"), async (req, res) => {
  let uploadedFilePath: string | null = null;
  
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    uploadedFilePath = req.file.path;

    // Get the latest profile
    const profile = await Profile.findOne({ order: [["id", "DESC"]] });
    if (!profile) {
      // Delete the uploaded file if profile not found
      if (fs.existsSync(uploadedFilePath)) {
        fs.unlinkSync(uploadedFilePath);
      }
      return res.status(404).json({ message: "No profile found" });
    }

    let cvUrl: string;

    // Upload to S3 if configured, otherwise use local storage
    if (isS3Configured()) {
      try {
        // Upload to S3
        const s3Key = `cv/${req.file.filename}`;
        cvUrl = await uploadToS3(
          uploadedFilePath,
          s3Key,
          req.file.mimetype
        );

        // Delete old CV file from S3 if it exists
        if (profile.cv) {
          const oldS3Key = extractS3Key(profile.cv);
          if (oldS3Key) {
            await deleteFromS3(oldS3Key);
          } else if (profile.cv.startsWith("/uploads/")) {
            // Old local file - try to delete from local storage
            const oldFilePath = path.join(process.cwd(), "public", profile.cv);
            if (fs.existsSync(oldFilePath)) {
              fs.unlinkSync(oldFilePath);
            }
          }
        }

        // Clean up local temporary file after S3 upload
        if (fs.existsSync(uploadedFilePath)) {
          fs.unlinkSync(uploadedFilePath);
        }

        console.log("✅ CV uploaded to S3:", cvUrl);
      } catch (s3Error: any) {
        console.error("S3 upload error, falling back to local storage:", s3Error);
        // Fall back to local storage if S3 fails
        cvUrl = `/uploads/${req.file.filename}`;
      }
    } else {
      // Use local storage
      cvUrl = `/uploads/${req.file.filename}`;

      // Delete old CV file if it exists and is a local file
      if (profile.cv && profile.cv.startsWith("/uploads/")) {
        const oldFilePath = path.join(process.cwd(), "public", profile.cv);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
    }

    // Update profile with new CV URL
    await profile.update({ cv: cvUrl });

    return res.json({
      message: "CV uploaded successfully",
      cv: cvUrl,
      storage: isS3Configured() ? "S3" : "local",
    });
  } catch (err: any) {
    console.error("UPLOAD CV ERROR:", err);
    
    // Delete uploaded file if there was an error
    if (uploadedFilePath && fs.existsSync(uploadedFilePath)) {
      fs.unlinkSync(uploadedFilePath);
    }

    if (err.message && err.message.includes("are allowed")) {
      return res.status(400).json({ message: err.message });
    }

    return res.status(500).json({
      message: "Failed to upload CV",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
});
