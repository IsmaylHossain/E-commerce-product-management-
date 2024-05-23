
import mongoose from "mongoose";

import { z } from "zod";

export const OrderSchema = z.object({

  email: z.string().email(),
  productId: z.string().transform((val) => new mongoose.Types.ObjectId(val)),


  price: z.number().positive(),
  quantity: z.number().int().positive(),
});

 

export const PVariantsSchema = z.object({

  type: z.string(),
  value: z.string(),
});

export const PInventorySchema = z.object({

  quantity: z.number(),
  inStock: z.boolean(),
});


export const ProductsSchema = z.object({

name: z.string().nonempty({ message: "name is required" }),
description: z.string().nonempty({ message: "description is required" }),

  price: z.number().positive({ message: " price should positive value" }),

category: z.string().nonempty({ message: "category is required" }),
tags: z.array(z.string()),

variants: z.array(PVariantsSchema),
inventory: PInventorySchema,

});