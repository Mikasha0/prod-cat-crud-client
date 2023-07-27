import { useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader = async () => {
  const product = await db.product.findMany({});
  return product;
};

export default function Product() {
  const productList = useLoaderData<typeof loader>();
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 p-5">
        {productList.map((product) => (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-blue-500">{product.highlight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
