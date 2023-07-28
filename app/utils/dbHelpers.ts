import { Product } from "~/types/product.types";
import { db } from "./db.server";
import { Category } from "~/types/category.types";

export async function createProduct (data:Product){
    await db.product.create({
     data
    });
  } 

  export async function createCategory (data:Category){
    await db.category.create({
     data
    });
  } 