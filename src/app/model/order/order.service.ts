import { Product } from "../product/product.model";

import { TOrder } from "./order.interface";


import { Order } from "./order.model";

const getAllOrdeFromdb = async (emailQuery?: string) => {
  if (emailQuery) {
    const result = await Order.find({ email: emailQuery });
    return result;
  }
 

  const result = await Order.find();
  
  return result;
};

   const createOrderIntodb = async (payload: TOrder) => {
   const productId = payload.productId;


  const isProduct = await Product.findOne({ _id: productId });

  if (!isProduct) {
    
    throw new Error("Product id does not found.");
  }

  if (isProduct.inventory.quantity < payload.quantity) {

    throw new Error("Insufficient quantity");
  }
  if (payload.quantity <= 0) {

    throw new Error("Quantity must positive number.");
  }

  if (isProduct) {

    const result = await Order.create(payload);

     await Product.findOneAndUpdate(
      { _id: productId },
      {
        $inc: { "inventory.quantity": -payload.quantity },
        $set: {
          "inventory.inStock":

            isProduct.inventory.quantity - payload.quantity > 0,
        },
      }
    );

    return result;
  }
};

 


export const OrderServices = {
  createOrderIntodb,
  
  getAllOrdeFromdb,
};