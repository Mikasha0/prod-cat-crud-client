import { ActionArgs, redirect } from "@remix-run/node";
import { validationError } from "remix-validated-form";
import { productValidator } from "~/types/z.schema";
import { createProduct } from "~/utils/dbHelpers";

export const createProductAction = async ({ request }: ActionArgs) => {
  const result = await productValidator.validate(await request.formData());
  if (result.error) {
    return validationError(result.error);
  }
  await createProduct(result.data);
  return redirect("/product");
};
