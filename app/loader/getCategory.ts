import { db } from "~/utils/db.server";

export const loader = async () => {
    const categoryItems = await db.category.findMany({
      take: 35,
      select: { id: true, name: true },
    });
    return categoryItems;
  };