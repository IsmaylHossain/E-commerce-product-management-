// import { ProductModel } from './product.model';
// import { Product } from './product.interface';
 
import { Product } from "./product.model";
import { Products } from "./product.interface";

import mongoose from "mongoose";

const createProductIntodb = async (payload: Products) => {
  const result = await Product.create(payload);
  return result;
};
 

const getAllProductFromdb = async () => {
  const result = await Product.find();
  return result;
};
 

  const getSingleProductFromdb = async (payload: mongoose.Types.ObjectId) => {
  const result = await Product.findById(payload);

  return result;
};

const getSearchDocumentFromdb = async (queryId: string) => {
  console.log(queryId,'Product found');

  const result = await Product.aggregate([
    
    { $match: { $text: { $search: queryId } } }
  ]);

  return result;
};
 

const updateProductIntodb = async (
  productId: mongoose.Types.ObjectId,

  payload: Products
) => {
  const id = productId;

   const updatedData: { $set:any } = { $set: {} };

   Object.keys(payload).forEach((property) => {
    const properties = property as keyof Products;
     updatedData.$set[properties] = payload[properties];
  });

  const result = await Product.findByIdAndUpdate(id, payload, {

    new: true,
  });
  return result;

};

const deleteProductByIdFromdb = async (id: mongoose.Types.ObjectId) => {
  const result = await Product.deleteOne(id);
  return result;
};



export const ProductService = {
  createProductIntodb,
  
   getAllProductFromdb,
  getSingleProductFromdb,

  updateProductIntodb,
deleteProductByIdFromdb,
  getSearchDocumentFromdb,
};