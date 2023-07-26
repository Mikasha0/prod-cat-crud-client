// seed.js

import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main() {
  // Seed data for the category table
  await db.category.create({
    data: 
      { name: 'Category A', status: 'Active' },
      // Add more category seed data as needed
    
  });

  const category = await db.category.findFirst();
  if(!category){
    return null
  }
  // Seed data for the product table
  await db.product.create({
    data: 
      {
        name: 'Product X',
        description: 'This is product X',
        highlight: 'Important',
        status: 'Active',
        categoryId: category.id, // Replace with the actual UUID of Category A
      },
  
      // Add more product seed data as needed
    
  });
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await db.$disconnect();
  });
