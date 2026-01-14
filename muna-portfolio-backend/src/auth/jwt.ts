import jwt, { type SignOptions, type JwtPayload } from "jsonwebtoken";

export type AppJwtPayload = {
  id: number;
  email: string;
  role?: "admin" | "user";
};

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not defined`);
  return value;
}

const JWT_SECRET = requireEnv("JWT_SECRET");

/**
 * jsonwebtoken v9 types expect:
 * expiresIn: number | StringValue
 * but process.env gives string | undefined, which is too wide.
 */
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN ?? "1d") as SignOptions["expiresIn"];

export function signToken(payload: AppJwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): AppJwtPayload {
  const decoded = jwt.verify(token, JWT_SECRET);

  // optional safety: ensure object payload
  if (typeof decoded === "string") throw new Error("Invalid token payload");

  // If you want to ensure id/email exist at runtime, validate here
  return decoded as JwtPayload as AppJwtPayload;
}
