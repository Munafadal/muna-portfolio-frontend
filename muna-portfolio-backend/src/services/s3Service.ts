// src/services/s3Service.ts
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";

// Initialize S3 client if credentials are provided
const s3Client = process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
  ? new S3Client({
      region: process.env.AWS_REGION || "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    })
  : null;

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || "";
const USE_S3 = !!(
  process.env.AWS_ACCESS_KEY_ID &&
  process.env.AWS_SECRET_ACCESS_KEY &&
  BUCKET_NAME
);

/**
 * Upload a file to S3
 * @param filePath Local file path
 * @param key S3 object key (filename)
 * @param contentType MIME type of the file
 * @returns Public URL of the uploaded file
 */
export async function uploadToS3(
  filePath: string,
  key: string,
  contentType: string
): Promise<string> {
  if (!USE_S3 || !s3Client) {
    throw new Error("S3 is not configured. Please set AWS credentials.");
  }

  const fileContent = fs.readFileSync(filePath);

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: fileContent,
    ContentType: contentType,
    ACL: "public-read", // Make the file publicly accessible
  });

  await s3Client.send(command);

  // Return the public URL
  const publicUrl = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION || "us-east-1"}.amazonaws.com/${key}`;
  return publicUrl;
}

/**
 * Delete a file from S3
 * @param key S3 object key (filename)
 */
export async function deleteFromS3(key: string): Promise<void> {
  if (!USE_S3 || !s3Client) {
    return; // Silently fail if S3 is not configured
  }

  // Extract key from URL if full URL is provided
  const s3Key = key.startsWith("http") 
    ? key.split(".amazonaws.com/")[1]?.split("?")[0] || key
    : key;

  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: s3Key,
  });

  try {
    await s3Client.send(command);
  } catch (error) {
    console.error("Error deleting from S3:", error);
    // Don't throw - file might not exist
  }
}

/**
 * Check if S3 is configured and available
 */
export function isS3Configured(): boolean {
  return USE_S3;
}

/**
 * Extract S3 key from a URL
 */
export function extractS3Key(url: string): string | null {
  if (!url) return null;
  
  // If it's already a key (starts with uploads/ or cv-), return as is
  if (url.startsWith("uploads/") || url.startsWith("cv-")) {
    return url;
  }
  
  // If it's an S3 URL, extract the key
  if (url.includes(".amazonaws.com/")) {
    const parts = url.split(".amazonaws.com/");
    return parts[1]?.split("?")[0] || null;
  }
  
  // If it's a local path, return null (not an S3 file)
  if (url.startsWith("/uploads/")) {
    return null;
  }
  
  return null;
}
