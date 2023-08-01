import { ActionArgs, redirect } from "@remix-run/node";
import { validationError } from "remix-validated-form";
import { categoryValidator } from "~/types/z.schema";
import { createCategory } from "~/utils/dbHelpers";

export const createCategoryAction = async ({ request }: ActionArgs) => {
    const result = await categoryValidator.validate(await request.formData());
    if (result.error) {
      return validationError(result.error);
    }
    await createCategory(result.data);
    return redirect("/category");
};
