import { withZod } from "@remix-validated-form/with-zod";
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

const zString = (
  minLength = 1,
  maxLength = 100,
  field = "name",
  minMessage = "should not be empty or less than",
  maxMessage = "should not be greater than "
) => {
  return z
    .string()
    .min(minLength, { message: field + " " + minMessage + " " + minLength })
    .max(maxLength, { message: maxMessage + " " + maxLength });
};
export const productSchemaObj = z.object({
  categoryId: zString(),
  name: zString(3, 50, "Name"),
  description: zString(3, 150, "Description"),
  highlight: zString(2, 80, "Highlight"),
  status: zString(3, 15),
});

export const productValidator = withZod(productSchemaObj);

export const categorySchemaObj = z.object({
  name: zString(3, 50),
  status: zString(3, 15),
});

export const categoryValidator = withZod(categorySchemaObj);
