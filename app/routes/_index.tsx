import {
  unstable_parseMultipartFormData,
  type ActionArgs,
  type V2_MetaFunction,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { Status, productSchemaObj } from "~/types/z.schema";
import { fileAndFieldUploadHandler } from "~/utils/fileUploadHandler";
import { getProductFormData } from "~/utils/formUtils";
import { badRequest } from "~/utils/request.server";
import { db } from "~/utils/db.server";

import * as fs from 'fs'
import test from '~/images/test.png'



export const meta: V2_MetaFunction = () => {
  return [
    { title: "PROD-CAT-CRUD-CLIENT" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  // const API_RESPONSE = await fetch(`http://localhost:3334/api/categories`);
  // const data = await API_RESPONSE.json();
  // return data;
  const categoryItems = await db.category.findMany({
    take:35,
    select:{id:true,name:true}
  });
  return categoryItems

};

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

export const createProductAction = async ({ request }: ActionArgs) => {
  const form = await await request.formData()
  // const imageBuffer = fs.createReadStream('/images/test.png')
  // console.log(imageBuffer)

  const { categoryId, name, description, highlight, status } =
    getProductFormData(form);
    console.log(getProductFormData(form));
  const parseResult = productSchemaObj.safeParse({
    categoryId,
    name,
    description,
    highlight,
    status,
  });
  if(!parseResult.success){
    const fieldErrors = parseResult.error.format();
    return badRequest({
      fieldErrors,
      fields:null,
      formError:"Form not submitted correctly",
    })
  }
  console.log(parseResult)

  const fields = {
    categoryId,
    name,
    description,
    highlight,
    status
  }
  console.log("fields",fields)

   await db.product.create({
    data:{
      ...fields,
    }
  })

  // const API_URL = `http://localhost:3334/api/products`
  // console.log(API_URL);
  // try{
  //   const response = await fetch(API_URL,{
  //     method:'POST',
  //     body:JSON.stringify(parseResult.data)
  //   });
  //   const product_data = await response.json()
  //   console.log(product_data);
  // }catch(error){
  //   return new Response("API request error", {status:500})
  // }

  return redirect('/')
};


export const createCategoryAction = async ({request}:ActionArgs) =>{
  const form = await request.formData();
  console.log(form.entries());
  console.log("createCategoryAction working")

  return redirect('/')

}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex justify-center items-center h-screen bg-[#f3f4f6] ">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <Form method="post" encType="multipart/form-data">
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
              {data.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            name="_action"
            value="CREATE_CATEGORY"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Category
          </button>
          <div className="mb-6">
            <label
              htmlFor="product"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="highlight"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Highlight
            </label>
            <input
              type="text"
              name="highlight"
              id="highlight"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
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
          <button
            type="submit"
            name="_action"
            value="CREATE_PRODUCT"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Post Product
          </button>
        </Form>
      </div>
    </div>
  );
}
