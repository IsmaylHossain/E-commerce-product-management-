// import { ProductModel } from './product.model';
// import { Product } from './product.interface';
 
///
import { Product } from "./product.model";
import { Products } from "./product.interface";
import mongoose from "mongoose";

const createProductIntoDb = async (payload: Products) => {
  const result = await Product.create(payload);
  return result;
};
 

const getAllProductFromDb = async () => {
  const result = await Product.find();
  return result;
};
 

  const getSingleProductFromDb = async (payload: mongoose.Types.ObjectId) => {
  const result = await Product.findById(payload);

  return result;
};
 

const updateProductIntoDb = async (
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

 

const deleteProductByIdFromDb = async (id: mongoose.Types.ObjectId) => {
  const result = await Product.deleteOne(id);
  return result;
};


const getSearchDocumentFromDb = async (queryId: string) => {
  console.log(queryId,'iam inside db');

  const result = await Product.aggregate([
    
    { $match: { $text: { $search: queryId } } }
  ]);

  return result;
};

export const ProductServices = {
  createProductIntoDb,
  
   getAllProductFromDb,
  getSingleProductFromDb,

  updateProductIntoDb,
deleteProductByIdFromDb,
  getSearchDocumentFromDb,
};