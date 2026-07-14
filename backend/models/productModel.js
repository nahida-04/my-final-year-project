import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: [String], required: true }, // must be an array of strings
  language: { type: String, required: true },
  genre: { type: String, required: true },
  bestseller: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }, // store timestamp
});

export const productModel =
mongoose.models.product || mongoose.model("product", productSchema);
