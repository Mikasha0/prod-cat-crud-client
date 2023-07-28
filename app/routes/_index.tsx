import {
  type ActionArgs
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { createCategoryAction } from "~/action/createCategoryAction";
import { createProductAction } from "~/action/createProductAction";
import AddCategory from "~/component/addCategory";
import ProductInputField from "~/component/productInput";
import { loader as getCategory } from "~/loader/getCategory";
import { CategoryIdAndName } from "~/types/categoryIdAndName-types";
import { Status } from "~/types/z.schema";
export const loader = async ()=>{
  return await getCategory();
}

export async function action(args: ActionArgs) {
  const formData = await args.request.clone().formData();
  const _action = formData.get("_action");
  if (_action === "CREATE_PRODUCT") {
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
        <Form method="post">
          <div className="mb-6">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select a category:
            </label>
            <select
              id="categoryId"
              name="categoryId"
              className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            >
              {data.map((category:CategoryIdAndName) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="status"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Status:
            </label>
            <select
              id="stautus"
              name="status"
              className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            >
              {Status.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <ProductInputField/>

         
          <button
            type="submit"
            name="_action"
            value="CREATE_PRODUCT"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Post Product
          </button>
          <button
            type="button"
            onClick={toggleModal}
            className=" mx-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Category
          </button>
          {visible && <AddCategory toggleModal={toggleModal} />}
        </Form>
      </div>
    </div>
  );
}
