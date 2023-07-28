import { ActionArgs, redirect } from "@remix-run/node";
import { categorySchemaObj } from "~/types/z.schema";
import { db } from "~/utils/db.server";
import { getCategoryFormData } from "~/utils/formUtils";
import { badRequest } from "~/utils/request.server";

export const createCategoryAction = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const { name, status } = getCategoryFormData(form);

  const parseResult = categorySchemaObj.safeParse({
    name,
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
    name,
    status,
  };

  await db.category.create({
    data: {
      ...fields,
    },
  });
  return redirect("/");
};
