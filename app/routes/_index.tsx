import { type ActionArgs } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { ValidatedForm } from "remix-validated-form";
import { createCategoryAction } from "~/action/createCategoryAction";
import { createProductAction } from "~/action/createProductAction";
import AddCategory from "~/component/addCategory";
import { loader as getCategory } from "~/loader/getCategory";
import ActionButton from "~/component/actionButton";
import DynamicDropDown from "~/component/dynamicDropDown";
import FormInput from "~/component/formInput";
import NormalButton from "~/component/normalButton";
import { Status, productValidator } from "~/types/z.schema";
export const loader = async () => {
  return await getCategory();
};

export async function action(args: ActionArgs) {
  const formData = await args.request.clone().formData();
  const _action = formData.get("_action");
  if (_action === "CREATE_PRODUCT") {
    console.log("hello from product");
    return createProductAction(args);
  }
  if (_action === "CREATE_CATEGORY") {
    return createCategoryAction(args);
  }
  throw new Error("Unknown action");
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const [visible, setVisible] = useState(false);
  const toggleModal = () => {
    setVisible(!visible);
  };
  return (
    <div className="flex justify-center items-center h-screen bg-[#f3f4f6] mb-4 ">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <ValidatedForm
          validator={productValidator}
          subaction="form1"
          method="post"
        >
          <DynamicDropDown
            labelName="Select a category"
            name="categoryId"
            data={data}
            dataKey="id"
            dataValueKey="categoryName"
          />

          <DynamicDropDown
            labelName="Status:"
            name="status"
            data={Status}
            dataKey="state"
            dataValueKey="state"
          />

          <FormInput label="Product Name" name="name" />
          <FormInput label="Description" name="description" />
          <FormInput label="Highlight" name="highlight" />
          <ActionButton buttonName="Post Product" value="CREATE_PRODUCT" />
          <NormalButton buttonName="Add Category" onClick={toggleModal} />
        </ValidatedForm>
        {visible && <AddCategory toggleModal={toggleModal} />}
      </div>
    </div>
  );
}
