import { Router } from "express";
import { Profile } from "../models/Profile";

export const profileRouter = Router();

/**
 * @openapi
 * /api/profile:
 *   get:
 *     summary: Get the first profile (or latest)
 *     responses:
 *       200:
 *         description: Profile returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: { type: integer }
 *                 name: { type: string }
 *                 bio: { type: string, nullable: true }
 *                 location: { type: string, nullable: true }
 *                 nationality: { type: string, nullable: true }
 *                 availability: { type: string, nullable: true }
 *                 dateOfBirth: { type: string, nullable: true }
 *                 email: { type: string }
 *                 phoneNumber: { type: string, nullable: true }
 *                 address: { type: string, nullable: true }
 *                 github: { type: string, nullable: true }
 *                 twitter: { type: string, nullable: true }
 *                 cv: { type: string, nullable: true }
 *                 linkedin: { type: string, nullable: true }
 *                 expectedSalery: { type: number, nullable: true }
 *                 ownACar: { type: boolean }
 *                 haveDrivingLicence: { type: boolean }
 *                 noticePeriod: { type: string, nullable: true }
 *                 immigrationStatus: { type: string, nullable: true }
 *                 references: { type: string, nullable: true }
 *                 willingToRelocate: { type: boolean }
 *                 languages: { type: string, nullable: true }
 *                 skills: { type: string, nullable: true }
 *                 createdAt: { type: string, format: date-time, nullable: true }
 *                 updatedAt: { type: string, format: date-time, nullable: true }
 *       404:
 *         description: No profile found
 *       500:
 *         description: Failed to load profile
 */
profileRouter.get("/", async (_req, res) => {
  try {
    const profile = await Profile.findOne({ order: [["id", "DESC"]] });
    if (!profile) return res.status(404).json({ message: "No profile found" });
    return res.json(profile);
  } catch (err) {
    console.error("GET PROFILE ERROR:", err);
    return res.status(500).json({ message: "Failed to load profile" });
  }
});




/**
 * @openapi
 * /api/profile:
 *   post:
 *     summary: Create a profile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email]
 *             properties:
 *               name: { type: string }
 *               email: { type: string }
 *               bio: { type: string, nullable: true }
 *               location: { type: string, nullable: true }
 *               nationality: { type: string, nullable: true }
 *               availability: { type: string, nullable: true }
 *               dateOfBirth: { type: string, nullable: true }
 *               phoneNumber: { type: string, nullable: true }
 *               address: { type: string, nullable: true }
 *               cv: { type: string, nullable: true }
 *               github: { type: string, nullable: true }
 *               twitter: { type: string, nullable: true }
 *               linkedin: { type: string, nullable: true }
 *               expectedSalery: { type: number, nullable: true }
 *               ownACar: { type: boolean }
 *               haveDrivingLicence: { type: boolean }
 *               noticePeriod: { type: string, nullable: true }
 *               immigrationStatus: { type: string, nullable: true }
 *               references: { type: string, nullable: true }
 *               willingToRelocate: { type: boolean }
 *               languages: { type: string, nullable: true }
 *               skills: { type: string, nullable: true }
 *     responses:
 *       201:
 *         description: Profile created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: { type: integer }
 *                 name: { type: string }
 *                 bio: { type: string, nullable: true }
 *                 location: { type: string, nullable: true }
 *                 nationality: { type: string, nullable: true }
 *                 availability: { type: string, nullable: true }
 *                 dateOfBirth: { type: string, nullable: true }
 *                 email: { type: string }
 *                 phoneNumber: { type: string, nullable: true }
 *                 address: { type: string, nullable: true }
 *                 github: { type: string, nullable: true }
 *                 twitter: { type: string, nullable: true }
 *                 cv: { type: string, nullable: true }
 *                 linkedin: { type: string, nullable: true }
 *                 expectedSalery: { type: number, nullable: true }
 *                 ownACar: { type: boolean }
 *                 haveDrivingLicence: { type: boolean }
 *                 noticePeriod: { type: string, nullable: true }
 *                 immigrationStatus: { type: string, nullable: true }
 *                 references: { type: string, nullable: true }
 *                 willingToRelocate: { type: boolean }
 *                 languages: { type: string, nullable: true }
 *                 skills: { type: string, nullable: true }
 *                 createdAt: { type: string, format: date-time, nullable: true }
 *                 updatedAt: { type: string, format: date-time, nullable: true }
 *       400:
 *         description: Validation error (missing required fields or invalid data)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: "Validation error" }
 *                 errors: { type: object }
 *       409:
 *         description: A profile with this email already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: "A profile with this email already exists" }
 *       500:
 *         description: Failed to create profile
 */
profileRouter.post("/", async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.name || !req.body.email) {
      return res.status(400).json({ 
        message: "Validation error",
        errors: {
          ...(!req.body.name && { name: "Name is required" }),
          ...(!req.body.email && { email: "Email is required" })
        }
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({ 
        message: "Validation error",
        errors: { email: "Invalid email format" }
      });
    }

    const created = await Profile.create(req.body);
    res.status(201).json(created);
  } catch (err: any) {
    console.error("CREATE PROFILE ERROR:", err);
    
    // Handle Sequelize validation errors
    if (err.name === "SequelizeValidationError") {
      const errors: Record<string, string> = {};
      err.errors.forEach((e: any) => {
        errors[e.path] = e.message;
      });
      return res.status(400).json({ 
        message: "Validation error",
        errors 
      });
    }
    
    // Handle unique constraint errors (duplicate email)
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ 
        message: "A profile with this email already exists" 
      });
    }
    
    // Handle database errors
    if (err.name === "SequelizeDatabaseError") {
      return res.status(400).json({ 
        message: "Database error",
        error: process.env.NODE_ENV === "development" ? err.message : undefined
      });
    }
    
    // Generic error
    return res.status(500).json({ 
      message: "Failed to create profile",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
});

/**
 * @openapi
 * /api/profile/{id}:
 *   put:
 *     summary: Update a profile by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Profile ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               email: { type: string }
 *               bio: { type: string, nullable: true }
 *               location: { type: string, nullable: true }
 *               nationality: { type: string, nullable: true }
 *               availability: { type: string, nullable: true }
 *               dateOfBirth: { type: string, nullable: true }
 *               phoneNumber: { type: string, nullable: true }
 *               address: { type: string, nullable: true }
 *               cv: { type: string, nullable: true }
 *               github: { type: string, nullable: true }
 *               twitter: { type: string, nullable: true }
 *               linkedin: { type: string, nullable: true }
 *               expectedSalery: { type: number, nullable: true }
 *               ownACar: { type: boolean }
 *               haveDrivingLicence: { type: boolean }
 *               noticePeriod: { type: string, nullable: true }
 *               immigrationStatus: { type: string, nullable: true }
 *               references: { type: string, nullable: true }
 *               willingToRelocate: { type: boolean }
 *               languages: { type: string, nullable: true }
 *               skills: { type: string, nullable: true }
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: { type: integer }
 *                 name: { type: string }
 *                 bio: { type: string, nullable: true }
 *                 location: { type: string, nullable: true }
 *                 nationality: { type: string, nullable: true }
 *                 availability: { type: string, nullable: true }
 *                 dateOfBirth: { type: string, nullable: true }
 *                 email: { type: string }
 *                 phoneNumber: { type: string, nullable: true }
 *                 address: { type: string, nullable: true }
 *                 github: { type: string, nullable: true }
 *                 twitter: { type: string, nullable: true }
 *                 cv: { type: string, nullable: true }
 *                 linkedin: { type: string, nullable: true }
 *                 expectedSalery: { type: number, nullable: true }
 *                 ownACar: { type: boolean }
 *                 haveDrivingLicence: { type: boolean }
 *                 noticePeriod: { type: string, nullable: true }
 *                 immigrationStatus: { type: string, nullable: true }
 *                 references: { type: string, nullable: true }
 *                 willingToRelocate: { type: boolean }
 *                 languages: { type: string, nullable: true }
 *                 skills: { type: string, nullable: true }
 *                 createdAt: { type: string, format: date-time, nullable: true }
 *                 updatedAt: { type: string, format: date-time, nullable: true }
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Failed to update profile
 */
profileRouter.put("/:id", async (req, res) => {
  try {
    const profile = await Profile.findByPk(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    
    // Validate email format if email is being updated
    if (req.body.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(req.body.email)) {
        return res.status(400).json({ 
          message: "Validation error",
          errors: { email: "Invalid email format" }
        });
      }
    }
    
    await profile.update(req.body);
    return res.json(profile);
  } catch (err: any) {
    console.error("UPDATE PROFILE ERROR:", err);
    
    // Handle Sequelize validation errors
    if (err.name === "SequelizeValidationError") {
      const errors: Record<string, string> = {};
      err.errors.forEach((e: any) => {
        errors[e.path] = e.message;
      });
      return res.status(400).json({ 
        message: "Validation error",
        errors 
      });
    }
    
    // Handle unique constraint errors (duplicate email)
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ 
        message: "A profile with this email already exists" 
      });
    }
    
    // Handle database errors
    if (err.name === "SequelizeDatabaseError") {
      return res.status(400).json({ 
        message: "Database error",
        error: process.env.NODE_ENV === "development" ? err.message : undefined
      });
    }
    
    // Generic error with more details in development
    return res.status(500).json({ 
      message: "Failed to update profile",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
});

/**
 * @openapi
 * /api/profile/{id}:
 *   delete:
 *     summary: Delete a profile by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Profile ID
 *     responses:
 *       204:
 *         description: Profile deleted successfully
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Failed to delete profile
 */
profileRouter.delete("/:id", async (req, res) => {
  try {
    const profile = await Profile.findByPk(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    await profile.destroy();
    return res.status(204).send();
  } catch (err) {
    console.error("DELETE PROFILE ERROR:", err);
    return res.status(500).json({ message: "Failed to delete profile" });
  }
});
