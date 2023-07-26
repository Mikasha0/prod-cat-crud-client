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



export const productSchemaObj = z.object({
  categoryId: z.string(),
  name: z.string().min(3),
  description: z.string(),
  highlight: z.string(),
  status: z.string(),
  image: z.any(),
});
