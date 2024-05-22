import { Request, Response } from "express";

import { OrderServices } from "./order.service";

import { OrderSchema } from "./order.validates";

 
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderInfo = req.body;

    const zodValidateParser = OrderSchema.parse(orderInfo);
    const result = await OrderServices.createOrderIntoDb(zodValidateParser);

    res.status(200).json({
      success: true,

      message: "Order created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: "Order not found ",
     });
  }
};

 
const getallOrder = async (req: Request, res: Response) => {
  try {
    const queryEmail = req.query.email;
    console.log(queryEmail);
    let result;
    if (typeof queryEmail == "string" && queryEmail) {
      result = await OrderServices.getAllOrdeFromDb(queryEmail);
    } else {
      result = await OrderServices.getAllOrdeFromDb();
    }

    res.status(200).json({
      success: true,

      message: "Order get  successfully!",

      data: result,
    });
  } catch (error) {
    res.status(400).json({

      success: false,
      error: (error as Error).message,

    });
  }
};

export const OrderController = {
    
  createOrder,

  getallOrder,
};