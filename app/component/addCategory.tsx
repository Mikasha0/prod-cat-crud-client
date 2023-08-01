import { Form } from "@remix-run/react";
import { AddCategoryProps } from "~/types/add-category-prop.types";
import { Status } from "~/types/z.schema";
import ActionButton from "~/component/actionButton";
import NormalButton from "./normalButton";

export default function AddCategory({ toggleModal }: AddCategoryProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-gray-900 opacity-70"
        onClick={toggleModal}
      ></div>
      <div className="bg-white p-6 rounded-lg z-10">
        <Form method="post">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Category Name
          </label>
          <input
            type="text"
            name="name"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
           <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Status:
          </label>
          <select
              id="stautus"
              name="status"
              className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            >
              {Status.map((status:string) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          <div className="mt-4 flex justify-end">
            {/* <button
              type="button"
              className="text-gray-600 hover:text-gray-800 font-medium mr-4"
              onClick={toggleModal}
            >
              Cancel
            </button> */}
            <NormalButton buttonName="Cancel" onClick={toggleModal}/>
            {/* <button
              type="submit"
              name="_action"
            value="CREATE_CATEGORY"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Add
            </button> */}
            <ActionButton buttonName="Add" value="CREATE_CATEGORY"/>
          </div>
        </Form>
      </div>
    </div>
  );
}
