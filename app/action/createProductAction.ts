import { ActionArgs, redirect } from "@remix-run/node";
import { validationError } from "remix-validated-form";
import { productValidator } from "~/types/z.schema";
import { createProduct } from "~/utils/dbHelpers";
import { badRequest } from "~/utils/request.server";

export const createProductAction = async ({ request }: ActionArgs) => {

  const result = await productValidator.validate( await request.formData())
  if(result.error){
    const fieldErrors = validationError(result.error);
       return badRequest({
        fieldErrors,
        fields: null,
        formError: "Form not submitted correctly",
      });
  }
  const product = result.data 
  await createProduct(product)
  return redirect("/product");
  };