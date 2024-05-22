import { Product } from "../product/product.model";

import { TOrder } from "./order.interface";


import { Order } from "./order.model";

   const createOrderIntoDb = async (payload: TOrder) => {
   const productId = payload.productId;


  const isexistProduct = await Product.findOne({ _id: productId });

  if (!isexistProduct) {
    
    throw new Error("Invalid productId(userid). Product ID does not exist.");
  }

  if (isexistProduct.inventory.quantity < payload.quantity) {

    throw new Error("Insufficient quantity");
  }
  if (payload.quantity <= 0) {

    throw new Error("Quantity must positive number.");
  }

  if (isexistProduct) {

    const result = await Order.create(payload);

     await Product.findOneAndUpdate(
      { _id: productId },
      {
        $inc: { "inventory.quantity": -payload.quantity },
        $set: {
          "inventory.inStock":

            isexistProduct.inventory.quantity - payload.quantity > 0,
        },
      }
    );

    return result;
  }
};

 

const getAllOrdeFromDb = async (emailQuery?: string) => {
  if (emailQuery) {
    const result = await Order.find({ email: emailQuery });
    return result;
  }
 

  const result = await Order.find();
  return result;
};

export const OrderServices = {
  createOrderIntoDb,
  
  getAllOrdeFromDb,
};