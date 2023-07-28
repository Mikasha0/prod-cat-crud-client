export async function createProduct (data:Product){
    await db.product.create({
     data
    });
  } 