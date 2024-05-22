import { OrderRoutes } from './app/model/order/order.route';
import { ProductRoutes } from './app/model/product/product.route';
import express, { NextFunction, Request, Response } from "express";
//  import { ProductRoutes } from "./app/model/product/product";
//  import { OrderRoutes } from "./order.route";
export const app = express();

app.use(express.json());
  app.use("/api/products", ProductRoutes);

  app.use("/api/orders", OrderRoutes);

 app.get("/", (req: Request, res: Response) => {
  res.send("Server is running!");
});

app.all("*", (req, res, next) => {

  const error = new Error(`This route did not find  please enter correct route [${req.url}]`);
  (error as any).status = 404;
  next(error);
});

app.use((err: any, req: Request, res: Response,next:NextFunction) => {

  res.status(err.status || 500).json({
    message: err.message,
  });
});

 

export default app;