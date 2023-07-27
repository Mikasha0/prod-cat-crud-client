import { ActionArgs, redirect } from "@remix-run/node";
import { productSchemaObj } from "~/types/z.schema";
import { db } from "~/utils/db.server";
import { getProductFormData } from "~/utils/formUtils";
import { badRequest } from "~/utils/request.server";

export const createProductAction = async ({ request }: ActionArgs) => {
    const form =  await request.formData();
    const { categoryId, name, description, highlight, status } =
      getProductFormData(form);
    const parseResult = productSchemaObj.safeParse({
      categoryId,
      name,
      description,
      highlight,
      status,
    });
    if (!parseResult.success) {
      const fieldErrors = parseResult.error.format();
      return badRequest({
        fieldErrors,
        fields: null,
        formError: "Form not submitted correctly",
      });
    }
  
    const fields = {
      categoryId,
      name,
      description,
      highlight,
      status,
    };
  
    await db.product.create({
      data: {
        ...fields,
      },
    });
  
    return redirect("/product");
  };