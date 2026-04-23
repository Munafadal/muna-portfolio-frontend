import { Router } from "express";
import { Profile } from "../models/Profile";

const router = Router();

/**
 * @openapi
 * /api/profile:
 *   get:
 *     tags:
 *       - Profile
 *     summary: Get latest profile
 *     responses:
 *       200:
 *         description: Profile returned successfully
 *       404:
 *         description: No profile found
 *       500:
 *         description: Failed to fetch profile
 */
router.get("/", async (_req, res) => {
  try {
    // Some deployed DBs may not have every model column (for example expectedSalery),
    // so select a stable subset to avoid runtime 500 errors.
    const profile = await Profile.findOne({
      order: [["id", "DESC"]],
      attributes: [
        "id",
        "name",
        "bio",
        "location",
        "nationality",
        "availability",
        "dateOfBirth",
        "email",
        "phoneNumber",
        "address",
        "cv",
        "github",
        "twitter",
        "linkedin",
        "ownACar",
        "haveDrivingLicence",
        "noticePeriod",
        "immigrationStatus",
        "references",
        "willingToRelocate",
        "languages",
        "skills",
      ],
    });

    if (!profile) {
      return res.status(404).json({ message: "No profile found" });
    }

    return res.json({ ...profile.toJSON(), expectedSalery: null });
  } catch (error) {
    console.error("GET PROFILE ERROR:", error);
    return res.status(500).json({ message: "Failed to fetch profile" });
  }
});

export default router;
