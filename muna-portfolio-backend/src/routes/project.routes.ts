import { Router } from "express";
import { Project } from "../models/Project";

export const projectRouter = Router();

/**
 * @openapi
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     responses:
 *       200:
 *         description: List of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id: { type: integer }
 *                   title: { type: string }
 *                   description: { type: string }
 *                   tech: { type: string }
 *                   highlight: { type: string, nullable: true }
 *                   url: { type: string, nullable: true }
 *                   githubUrl: { type: string, nullable: true }
 *                   imageUrl: { type: string, nullable: true }
 *                   featured: { type: boolean }
 *                   order: { type: integer }
 */
projectRouter.get("/", async (_req, res) => {
  try {
    const projects = await Project.findAll({
      order: [["order", "ASC"], ["createdAt", "DESC"]],
    });
    return res.json(projects);
  } catch (err) {
    console.error("GET PROJECTS ERROR:", err);
    return res.status(500).json({ message: "Failed to fetch projects" });
  }
});

/**
 * @openapi
 * /api/projects/{id}:
 *   get:
 *     summary: Get a single project by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Project returned
 *       404:
 *         description: Project not found
 */
projectRouter.get("/:id", async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res.json(project);
  } catch (err) {
    console.error("GET PROJECT ERROR:", err);
    return res.status(500).json({ message: "Failed to fetch project" });
  }
});

/**
 * @openapi
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - tech
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               tech: { type: string }
 *               highlight: { type: string, nullable: true }
 *               url: { type: string, nullable: true }
 *               githubUrl: { type: string, nullable: true }
 *               imageUrl: { type: string, nullable: true }
 *               featured: { type: boolean }
 *               order: { type: integer }
 *     responses:
 *       201:
 *         description: Project created
 *       400:
 *         description: Validation error
 */
projectRouter.post("/", async (req, res) => {
  try {
    const project = await Project.create(req.body);
    return res.status(201).json(project);
  } catch (err: any) {
    console.error("CREATE PROJECT ERROR:", err);
    if (err.name === "SequelizeValidationError") {
      const errors: Record<string, string> = {};
      err.errors.forEach((e: any) => {
        errors[e.path] = e.message;
      });
      return res.status(400).json({
        message: "Validation error",
        errors,
      });
    }
    return res.status(500).json({
      message: "Failed to create project",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
});

/**
 * @openapi
 * /api/projects/{id}:
 *   put:
 *     summary: Update a project
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               tech: { type: string }
 *               highlight: { type: string, nullable: true }
 *               url: { type: string, nullable: true }
 *               githubUrl: { type: string, nullable: true }
 *               imageUrl: { type: string, nullable: true }
 *               featured: { type: boolean }
 *               order: { type: integer }
 *     responses:
 *       200:
 *         description: Project updated
 *       404:
 *         description: Project not found
 *       400:
 *         description: Validation error
 */
projectRouter.put("/:id", async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    await project.update(req.body);
    return res.json(project);
  } catch (err: any) {
    console.error("UPDATE PROJECT ERROR:", err);
    if (err.name === "SequelizeValidationError") {
      const errors: Record<string, string> = {};
      err.errors.forEach((e: any) => {
        errors[e.path] = e.message;
      });
      return res.status(400).json({
        message: "Validation error",
        errors,
      });
    }
    return res.status(500).json({
      message: "Failed to update project",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
});

/**
 * @openapi
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete a project
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Project deleted
 *       404:
 *         description: Project not found
 */
projectRouter.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    await project.destroy();
    return res.json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error("DELETE PROJECT ERROR:", err);
    return res.status(500).json({ message: "Failed to delete project" });
  }
});
