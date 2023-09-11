"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const razorpay_1 = __importDefault(require("razorpay"));
const express_1 = __importDefault(require("express"));
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const paymentrouter = express_1.default.Router();
paymentrouter.post("/orders", (req, res) => {
    let instance = new razorpay_1.default({
        key_id: process.env.KEY_ID || "",
        key_secret: process.env.KEY_SECRET || ""
    });
    var options = {
        amount: req.body.amount * 100,
        currency: "INR",
    };
    instance.orders.create(options, function (err, order) {
        if (err) {
            return res.send({ code: 500, message: "Server Err." });
        }
        return res.send({ code: 200, message: "order created", data: order });
    });
});
paymentrouter.post("/verify", (req, res) => {
    let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;
    var expectedSignature = crypto_1.default.createHmac('sha256', process.env.KEY_SECRET || "")
        .update(body.toString())
        .digest('hex');
    if (expectedSignature === req.body.response.razorpay_signature) {
        res.send({ code: 200, message: 'Sign Valid' });
    }
    else {
        res.send({ code: 500, message: 'Sign Invalid' });
    }
});
exports.default = paymentrouter;
