//

 import { Request, Response } from "express";
import { ProductServices } from "./product.service";

 import mongoose from "mongoose"; 

import { TProductsSchema } from "./product.validates";


 const createProduct = async (req: Request, res: Response) => {
  try {

    const productData = req.body;
    const zodParseData= TProductsSchema.parse(productData);

    const result = await ProductServices.createProductIntoDb(zodParseData);

    res.json({

      success: true,
       message: "created succesfully!",
      data: result,
    });


  } catch (error) {

    res.status(500).json({

      success: false,
      message: (error as Error).message || "something wrong"
    });
  }
};
 

 const getAllProduct = async (req: Request, res: Response) => {
  try {
    const queryId = req.query.searchTerm;

    if (queryId) {
      const result = await ProductServices.getSearchDocumentFromDb(
        queryId as string
      );
       res.json({
        message: "Products matching search term 'iphone' fetched successfully!",

        success: true,
        data: result,

      });

      return;
    }


     const result = await ProductServices.getAllProductFromDb();
    res.json({
      success: true,
      message: "found all successfully!",
      data: result,
    });
  } catch (error) {

    res.status(500).json({
      success: false,

      message: (error as Error).message || " something  wrong",
    });
  }
};
 

  const getSingleProduct = async (req: Request, res: Response) => {
  try {

    const stringId = req.params.productId;
    const paramId = new mongoose.Types.ObjectId(stringId);

    const result = await ProductServices.getSingleProductFromDb(paramId);

    res.json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message || "something went wrong",
    });
  }
};

 

const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const zodParseData= TProductsSchema.parse(productData);

    const id = new mongoose.Types.ObjectId(req.params.productId);

    console.log(id);

     const result = await ProductServices.updateProductIntoDb(id, zodParseData);

    res.json({

      success: true,
      message: " updated successfully ",
      data: result,
    });
  } catch (error) {
   
    
    res.json({
      success: false,

      message: "updated fail !",
      error: (error as Error).message,

    });
  }
};
 
const deleteProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;

    const productIdWithObjId = new mongoose.Types.ObjectId(productId);

    const result = await ProductServices.deleteProductByIdFromDb(
      productIdWithObjId
    );

    res.json({
      success: true,
       message: "delete successfully!",

      data:null,

      info: result,
    });
  } catch (error) {
    res.status(404).json({
      error: (error as Error).message,
    });
  }
};
 

export const ProductController = {
  createProduct,

  getAllProduct,
getSingleProduct ,

  updateSingleProduct,
  deleteProductById

};