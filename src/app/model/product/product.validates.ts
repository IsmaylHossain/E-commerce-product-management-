
import { z } from "zod";


export const TVariantsSchema = z.object({

    type: z.string(),
    value: z.string(),
  });

  export const TInventorySchema = z.object({

    quantity: z.number(),
    inStock: z.boolean(),
  });


export const TProductsSchema = z.object({

  name: z.string().nonempty({ message: "Name required" }),
  description: z.string().nonempty({ message: "Description required" }),

    price: z.number().positive({ message: "Price should a positive number" }),

  category: z.string().nonempty({ message: "Category required" }),
  tags: z.array(z.string()),

  variants: z.array(TVariantsSchema),
  inventory: TInventorySchema,
  
});