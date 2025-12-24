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
 *       404:
 *         description: No profile found
 */
profileRouter.get("/", async (_req, res) => {
  const profile = await Profile.findOne({ order: [["id", "DESC"]] });
  if (!profile) return res.status(404).json({ message: "No profile found" });
  res.json(profile);
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
 *               github: { type: string, nullable: true }
 *               linkedin: { type: string, nullable: true }
 *               skills: { type: string, nullable: true }
 *               languages: { type: string, nullable: true }
 *     responses:
 *       201:
 *         description: Profile created
 */
profileRouter.post("/", async (req, res) => {
  const created = await Profile.create(req.body);
  res.status(201).json(created);
});
