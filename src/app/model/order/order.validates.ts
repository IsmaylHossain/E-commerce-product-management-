import mongoose from "mongoose";

import { z } from "zod";

export const OrderSchema = z.object({

  email: z.string().email(),
  productId: z.string().transform((val) => new mongoose.Types.ObjectId(val)),


  price: z.number().positive(),
  quantity: z.number().int().positive(),
});