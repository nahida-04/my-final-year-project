import { productModel } from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";

/* ---------------- CLOUDINARY CONFIG ---------------- */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/* ---------------- ADD PRODUCT (BOOK) ---------------- */
export const addProduct = async (req, res) => {
  try {
    console.log("addProduct called");
    console.log("Body:", req.body);
    console.log("Files:", req.files);

    const { name, description, price, language, genre, bestseller } = req.body;

    // Check files
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }

    const allFiles = Object.values(req.files).flat();

    // Upload images to Cloudinary
    const imagesUrl = await Promise.all(
      allFiles.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    // Create book product
    const newProduct = new productModel({
      name,
      description,
      price: Number(price),
      language,
      genre,
      bestseller: bestseller === "true",
      image: imagesUrl,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      product: newProduct,
    });
  } catch (error) {
    console.error("addProduct error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ---------------- LIST PRODUCTS ---------------- */
export const listProducts = async (req, res) => {
  try {
    const products = await productModel.find();

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("listProducts error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ---------------- REMOVE PRODUCT ---------------- */
export const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product removed",
      productId: deletedProduct._id,
    });
  } catch (error) {
    console.error("removeProduct error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ---------------- SINGLE PRODUCT ---------------- */
export const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("singleProduct error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};