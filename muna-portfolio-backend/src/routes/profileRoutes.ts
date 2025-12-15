import { Router } from "express";
import {
  createProfile,
  getProfiles,
  getProfileById,
  updateProfile,
  deleteProfile,
} from "../controllers/profileController";

const router = Router();

// GET /api/profiles
router.get("/", getProfiles);

// GET /api/profiles/:id
router.get("/:id", getProfileById);

// POST /api/profiles
router.post("/", createProfile);

// PUT /api/profiles/:id
router.put("/:id", updateProfile);

// DELETE /api/profiles/:id
router.delete("/:id", deleteProfile);

export default router;
