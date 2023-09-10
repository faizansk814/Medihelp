import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { Product, ProductModel } from "../models/product.model";
dotenv.config();

const productrouter = express.Router();

productrouter.post("/add", async (req: Request, res: Response) => {
  const { name, description, price, category, image }: Product = req.body;
  try {
    const newProduct: Product = new ProductModel({
      name,
      description,
      price,
      category,
      image,
    });
    await newProduct.save();
    return res.status(200).send({ msg: "Product added successfully" });
  } catch (error: any) {
    return res.status(401).send({ msg: error.message });
  }
});

productrouter.get("/get", async (req: Request, res: Response) => {
  try {
    const data: Product[] | [] = await ProductModel.find();
    return res.status(200).send(data);
  } catch (error: any) {
    return res.status(401).send({ msg: error.message });
  }
});

productrouter.get("/part/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data: Product | null = await ProductModel.findById(id);
    return res.status(200).send(data);
  } catch (error: any) {
    return res.status(401).send({ msg: error.message });
  }
});

productrouter.get("/filter", async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    const data: Product[] | [] = await ProductModel.find({ category });
    return res.status(200).json(data);
  } catch (error: any) {
    res.status(404).send({ msg: error.message });
  }
});

productrouter.get("/paginate", async (req: Request, res: Response) => {
  try {
    const { limit, page } = req.query;
    const skip = parseInt(limit as string) * (parseInt(page as string) - 1); // for page 3 -> 5 * (3-1) = 10 skip
    const data: Product[]|[] = await ProductModel.find()
      .skip(skip)
      .limit(parseInt(limit as string));
    res.status(200).send(data);
  } catch (error: any) {
    res.status(404).send({ msg: error.message });
  }
});

export default productrouter;
