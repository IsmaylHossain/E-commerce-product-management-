
// export const ProductModel =  mongoose.model<Product>('Product', ProductSchema);

///
import { Schema, model } from "mongoose";

 import { Inventory,Products, Variant } from "./product.interface";  

 const inventory = new Schema<Inventory>({

  quantity: { type: Number },

  inStock: Boolean,
});

const variants = new Schema<Variant>({

  type: String,

  value: String,
});



const productSchema = new Schema<Products>({
  name: { type: String, required: true },

  description: { type: String, required: true },


   price: { type: Number, required: true }, 
  category: { type: String, required: true },

  tags: { type: [String], default: undefined },
    variants: [variants],
  inventory: inventory,
});

 
productSchema.index({ name: "text" });

export const Product = model<Products>("Product", productSchema);