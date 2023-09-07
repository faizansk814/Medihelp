"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderrouter = express_1.default.Router();
orderrouter.get("/get", (req, res) => {
    return res.status(200).send({ msg: "welcome" });
});
exports.default = orderrouter;
