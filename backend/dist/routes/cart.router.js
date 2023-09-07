"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_model_1 = require("../models/cart.model");
const cartrouter = express_1.default.Router();
cartrouter.post("/add/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const alreadypresentproduct = await cart_model_1.CartModel.findOne({ userid: req.userid, productid: id });
        if (alreadypresentproduct) {
            return res.status(401).send({ "msg": "Product already in cart" });
        }
        const newProduct = new cart_model_1.CartModel({ userid: req.userid, productid: id });
        await newProduct.save();
        return res.status(200).send({ "msg": "product added to cart", newProduct });
    }
    catch (error) {
        return res.status(401).send({ "msg": error.message });
    }
});
cartrouter.get("/get", async (req, res) => {
    try {
        const userallProducts = await cart_model_1.CartModel.find({ userid: req.userid }).populate("productid");
        return res.status(200).send(userallProducts);
    }
    catch (error) {
        return res.status(401).send({ "msg": error.message });
    }
});
cartrouter.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteproduct = await cart_model_1.CartModel.findOneAndDelete({ _id: id });
        return res.status(200).send({ "msg": "Product cart deleted" });
    }
    catch (error) {
        return res.status(401).send({ "msg": error.message });
    }
});
cartrouter.patch("/inc/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updataUserCart = await cart_model_1.CartModel.findOneAndUpdate({ _id: id }, { $inc: { quantity: 1 } });
        return res.status(200).send({ msg: "Qunatity increased" });
    }
    catch (error) {
        return res.status(401).send({ "msg": error.message });
    }
});
cartrouter.patch("/dec/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await cart_model_1.CartModel.findById(id);
        if (product?.quantity == 1) {
            return res.status(401).send({ msg: "You cannot decreament further" });
        }
        else {
            const updataUserCart = await cart_model_1.CartModel.findOneAndUpdate({ _id: id }, { $inc: { quantity: -1 } });
            return res.status(200).send({ "msg": "Deacrement successfully" });
        }
    }
    catch (error) {
        return res.status(401).send({ "msg": error.message });
    }
});
exports.default = cartrouter;
