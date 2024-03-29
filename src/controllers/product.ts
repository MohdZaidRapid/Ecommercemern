import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewProductRequestBody } from "../types/types.js";
import { Product } from "../models/products.js";
import ErrorHandler from "../utils/utility-class.js";
import { rm } from "fs";

export const newProduct = TryCatch(
  async (
    req: Request<{}, {}, NewProductRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, price, stock, category } = req.body;

    const photo = req.file;
    if (!photo) return next(new ErrorHandler("Please Add Photo ", 400));

    if (!name || !price || !stock || !category) {
      rm(photo.path, () => {
        console.log("Deleted");
      });
      return next(new ErrorHandler("Please enter All Fields", 400));
    }

    await Product.create({
      name,
      price,
      stock,
      category: category.toLowerCase(),
      photo: photo.path,
    });
    return res
      .status(201)
      .json({ success: true, message: "Product created successfully" });
  }
);

export const getLatestProducts = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.find({}).sort({ createdAr: -1 }).limit(5);
    return res.status(200).json({ success: true, products });
  }
);

export const getAllCategories = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await Product.distinct("category");

    return res.status(200).json({ success: true, categories });
  }
);
