import { unstable_createFileUploadHandler} from "@remix-run/node";
import type { UploadHandler, UploadHandlerPart } from "@remix-run/node";


export const fileUploadHandler = unstable_createFileUploadHandler({
  directory: "./public/images",
  maxPartSize: 10_000_000,
  file: ({ filename }) => filename,
});

export const fileAndFieldUploadHandler: UploadHandler = async (part) => {
  if (
    part.name === "category" ||
    part.name === "product-name" ||
    part.name === "description" ||
    part.name === "highlight"||
    part.name === "status"
  ) {
    // Process the name and designation form fields
    const value = await partToString(part);
    return value.trim(); // Return the trimmed value
  }

  // For other files, use the default fileUploadHandler
  return fileUploadHandler(part);
};

const partToString = async (part: UploadHandlerPart): Promise<string> => {
  let value = "";
  for await (const chunk of part.data) {
    const decoder = new TextDecoder();
    value += decoder.decode(chunk);
  }
  return value;
};