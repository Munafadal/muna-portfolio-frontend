import { Router } from "express";
import { signToken } from "../auth/jwt";

export const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }

  const token = signToken({
    id: 1,
    email,
    role: "admin",
  });

  return res.json({ token });
});
