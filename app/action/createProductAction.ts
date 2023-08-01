import { ActionArgs, DataFunctionArgs, redirect } from "@remix-run/node";
import { validationError } from "remix-validated-form";
import { productValidator } from "~/types/z.schema";
import { db } from "~/utils/db.server";
import { createProduct } from "~/utils/dbHelpers";
import { badRequest } from "~/utils/request.server";

export const createProductAction = async ({ request }: ActionArgs) => {

  const result = await productValidator.validate( await request.formData())
  console.log(result)
  if(result.error){
    const fieldErrors = validationError(result.error);
    console.log(fieldErrors, "blabal")
       return badRequest({
        fieldErrors,
        fields: null,
        formError: "Form not submitted correctly",
      });
  }

  const { categoryId, name, description, highlight, status } = result.data;

  const productData = {
    categoryId,
    name,
    description,
    highlight,
    status,
  };
  await db.product.create({
    data:{...productData}
  })

  const formPayload = Object.fromEntries(await request.formData());

  console.log(formPayload);
  return redirect("/product");
  };