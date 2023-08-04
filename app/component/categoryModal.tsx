import { ValidatedForm } from "remix-validated-form";
import ActionButton from "~/component/actionButton";
import FormInput from "~/component/formInput";
import { AddCategoryProps } from "~/types/add-category-prop.types";
import { Status, categoryValidator } from "~/types/z.schema";
import DynamicDropDown from "./dynamicDropDown";
import NormalButton from "./normalButton";

export default function AddCategory({ toggleModal }: AddCategoryProps) {

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-900 opacity-70"></div>
      <div className="bg-white p-6 rounded-lg z-10">
        <ValidatedForm
          validator={categoryValidator}
          subaction="form2"
          method="POST"
        >
          <FormInput label="Category Name" name="categoryName" />
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
