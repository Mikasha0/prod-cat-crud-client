import { product } from "@prisma/client";
import { ActionArgs, redirect } from "@remix-run/node";
import { validationError } from "remix-validated-form";
import { productSchemaObj, validator } from "~/types/z.schema";
import { db } from "~/utils/db.server";
import { getProductFormData } from "~/utils/formUtils";
import { badRequest } from "~/utils/request.server";

export async function createProduct (data:any){
  await db.product.create({
   data
  });
} 

export const createProductAction = async ({ request }: ActionArgs) => {

  const result = await validator.validate( await request.formData())
  if(result.error){
    const fieldErrors = validationError(result.error);
       return badRequest({
        fieldErrors,
        fields: null,
        formError: "Form not submitted correctly",
      });
  }
  const productData = result.data 
  await createProduct(productData)


  return redirect("/product");
    // const form =  await request.formData();
    // const { categoryId, name, description, highlight, status } =
    //   getProductFormData(form);
    // const parseResult = productSchemaObj.safeParse({
    //   categoryId,
    //   name,
    //   description,
    //   highlight,
    //   status,
    // });
    // if (!parseResult.success) {
    //   const fieldErrors = parseResult.error.format();
    //   return badRequest({
    //     fieldErrors,
    //     fields: null,
    //     formError: "Form not submitted correctly",
    //   });
    // }

    
  };