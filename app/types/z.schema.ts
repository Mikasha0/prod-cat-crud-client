import { z } from "zod";

export const Status = ["PENDING", "ACTIVE", "DELETE"] as const;

z.enum(Status);

export const MAX_FILE_SIZE = 10 * 1024 * 1024;

const MIN_FILE_SIZE = 2 * 1024;

const MAX_FILENAME_LENGTH = 50;

export const WHITELISTED_MIMES = [
  "image/jpeg",
  "image/jpg",
  "image/gif",
  "image/png",
  "image/webp",
];

const ACCEPTED_EXTENSIONS = WHITELISTED_MIMES.map((mime) => mime.split("/")[1])
  .join(", ")
  .slice(0, -1);

const zString = (minLength = 1, maxLength = 100) => {
  return z.string().min(minLength).max(maxLength);
};

export const productSchemaObj = z.object({
  categoryId: zString(),
  name: zString(3, 50),
  description: zString(3, 150),
  highlight: zString(2, 80),
  status: zString(3, 15),
});

export const categorySchemaObj = z.object({
  name: zString(3, 50),
  status: zString(3,15),
});
