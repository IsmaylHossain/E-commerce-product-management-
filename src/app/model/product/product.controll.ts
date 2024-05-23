
 import { Request, Response } from "express";
import { ProductService } from "./product.service";

 import mongoose from "mongoose"; 

// import { TProductsSchema } from "./product.validates";
import { ProductsSchema } from "../validation/validation";

 const createProduct = async (req: Request, res: Response) => {
  try {

    const productData = req.body;
    const  ParseData= ProductsSchema.parse(productData);

    const result = await ProductService.createProductIntodb( ParseData);

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
      const result = await ProductService.getSearchDocumentFromdb(
        queryId as string
      );
       res.json({
        message: " products matching successfully!",

        success: true,
        data: result,

      });

      return;
    }


     const result = await ProductService.getAllProductFromdb();
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

    const result = await ProductService.getSingleProductFromdb(paramId);

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
    const  ParseData= ProductsSchema.parse(productData);

    const id = new mongoose.Types.ObjectId(req.params.productId);

    console.log(id);

     const result = await ProductService.updateProductIntodb(id,  ParseData);

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

    const result = await ProductService.deleteProductByIdFromdb(
      productIdWithObjId
    );

    res.json({
      success: true,
       message: "delet successfully!",

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