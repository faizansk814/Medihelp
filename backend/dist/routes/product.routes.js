"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const product_model_1 = require("../models/product.model");
dotenv_1.default.config();
const productrouter = express_1.default.Router();
productrouter.post("/add", async (req, res) => {
    const { name, description, price, category, image } = req.body;
    try {
        const newProduct = new product_model_1.ProductModel({
            name,
            description,
            price,
            category,
            image,
        });
        await newProduct.save();
        return res.status(200).send({ msg: "Product added successfully" });
    }
    catch (error) {
        return res.status(401).send({ msg: error.message });
    }
});
productrouter.get("/get", async (req, res) => {
    try {
        const data = await product_model_1.ProductModel.find();
        return res.status(200).send(data);
    }
    catch (error) {
        return res.status(401).send({ msg: error.message });
    }
});
productrouter.get("/part/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const data = await product_model_1.ProductModel.findById(id);
        return res.status(200).send(data);
    }
    catch (error) {
        return res.status(401).send({ msg: error.message });
    }
});
productrouter.get("/filter", async (req, res) => {
    try {
        const { category } = req.query;
        const data = await product_model_1.ProductModel.find({ category });
        return res.status(200).json(data);
    }
    catch (error) {
        res.status(404).send({ msg: error.message });
    }
});
productrouter.get("/paginate", async (req, res) => {
    try {
        const { limit, page } = req.query;
        const skip = parseInt(limit) * (parseInt(page) - 1); // for page 3 -> 5 * (3-1) = 10 skip
        const data = await product_model_1.ProductModel.find()
            .skip(skip)
            .limit(parseInt(limit));
        res.status(200).send(data);
    }
    catch (error) {
        res.status(404).send({ msg: error.message });
    }
});
exports.default = productrouter;
