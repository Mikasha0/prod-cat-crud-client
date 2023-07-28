import { ActionArgs, redirect } from "@remix-run/node";
import { validationError } from "remix-validated-form";
import { categoryValidator } from "~/types/z.schema";
import { createCategory } from "~/utils/dbHelpers";
import { badRequest } from "~/utils/request.server";

export const createCategoryAction = async ({ request }: ActionArgs) => {
  const form = await categoryValidator.validate(await request.formData());
  console.log(form);
  if (form.error) {
    const fieldErrors = validationError(form.error);
    return badRequest({
      fieldErrors,
      fields: null,
      formErrors: "Form not submitted correctly",
    });
  }
  const category = form.data;
  await createCategory(category);
  return redirect("/");
};
