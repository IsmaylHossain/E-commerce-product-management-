
import { OrderRoutes } from './app/model/order/order.router';

import { ProductRoutes } from './app/model/product/product.router';

import express, { NextFunction, Request, Response } from "express";
//  import { ProductRoutes } from "./app/model/product/product";
//  import { OrderRoutes } from "./order.route";

export const app = express();

app.use(express.json());

  app.use("/api/products", ProductRoutes);

  app.use("/api/orders", OrderRoutes);

 app.get("/", (req: Request, res: Response) => {

  res.send("The Server is running now!");
});

app.all("*", (req:Request , res:Response, next:NextFunction ) => {

  const error = new Error(`router not find  enter correct route [${req.url}]`);
  (error as any).status = 404;
  next(error);
});

app.use((err: any, req: Request, res: Response,next:NextFunction) => {

  res.status(err.status || 500).json({

    success: false,
    message: err.message,
  });
});

 

export default app;