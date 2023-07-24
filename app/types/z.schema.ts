import { z } from "zod";

export const Status = ["PENDING", "ACTIVE", "DELETE"] as const;

z.enum(Status);

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
const MIN_FILE_SIZE = 2 * 1024; // 2KB in bytes
const MAX_FILENAME_LENGTH = 50; // Maximum filename length
const WHITELISTED_MIMES = [
  "image/jpeg",
  "image/jpg",
  "image/gif",
  "image/png",
  "image/webp",
];
const ACCEPTED_EXTENSIONS = WHITELISTED_MIMES
  .map((mime) => mime.split("/")[1])
  .join(", ")
  .slice(0, -1);

// Custom validation function for image
const isValidImage = (file:any) => {
  if (!file || !file.name || !file.type || !file.size) {
    return false;
  }

  const fileSize = file.size;
  const fileName = file.name;

  // Check file size
  if (fileSize > MAX_FILE_SIZE || fileSize < MIN_FILE_SIZE) {
    return false;
  }

  // Check file extension (mime type)
  if (!WHITELISTED_MIMES.includes(file.type)) {
    return false;
  }

  // Check filename length
  if (fileName.length > MAX_FILENAME_LENGTH) {
    return false;
  }

  return true;
};

// Custom zod schema for validating the image
const imageSchema = z.custom((value) => {
  if (!isValidImage(value)) {
    return "Invalid image";
  }

  return true;
});

// Complete product schema
export const productSchemaObj = z.object({
  category: z.string(),
  product: z.string().min(3),
  description: z.string(),
  highlight: z.string(),
  status: z.string(),
  image: imageSchema,
});
