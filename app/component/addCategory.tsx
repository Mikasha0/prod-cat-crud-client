import { Form } from "@remix-run/react";
import { AddCategoryProps } from "~/types/add-category-prop.types";
import { Status, categoryValidator } from "~/types/z.schema";
import ActionButton from "~/component/actionButton";
import NormalButton from "./normalButton";
import DynamicDropDown from "./dynamicDropDown";
import { ValidatedForm } from "remix-validated-form";

import FormInput from "./formInput";

export default function AddCategory({ toggleModal }: AddCategoryProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-gray-900 opacity-70"
      ></div>
      <div className="bg-white p-6 rounded-lg z-10">
        <ValidatedForm validator={categoryValidator} subaction="form2" method="POST">
          <FormInput label="Category Name" name="categoryName"/>
          <DynamicDropDown
            labelName="Status:"
            name="status"
            data={Status}
            dataKey="state"
            dataValueKey="state"
          />
          <div className="mt-4 flex justify-end">
            <NormalButton buttonName="Cancel" onClick={toggleModal} />
            <ActionButton buttonName="Add" value="CREATE_CATEGORY" />
          </div>
        </ValidatedForm>
      </div>
    </div>
  );
}
