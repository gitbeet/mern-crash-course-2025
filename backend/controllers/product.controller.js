import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error while getting all products: ", error.message);
    res
      .status(500)
      .json({ success: false, message: `Server error: ${error.message}` });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    return res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error while creating product: ", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid product ID" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    return res.status(200).json({ success: true, date: updatedProduct });
  } catch (error) {
    console.error("Error while updating product: ", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid product ID" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Error while deleting product: ", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
