import { db } from "~/utils/db.server";

export const loader = async () => {
  const product = await db.product.findMany({
    select:{name:true,description:true, highlight:true}
  });
  return product;
};