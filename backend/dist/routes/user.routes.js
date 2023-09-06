"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const userrouter = express_1.default.Router();
userrouter.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const alreadyPresent = await user_model_1.UserModel.findOne({ email });
        if (alreadyPresent) {
            return res.status(401).send({ "msg": "User already present" });
        }
        bcrypt_1.default.hash(password, 5, async (err, hash) => {
            if (err) {
                console.log(err);
            }
            else {
                const newUser = new user_model_1.UserModel({ username, email, password: hash });
                await newUser.save();
                return res.status(200).send({ "msg": "Registration Succesful", newUser });
            }
        });
    }
    catch (error) {
        console.error(error);
        return res.status(401).json({ msg: error.msg });
    }
});
userrouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const alreadyPresent = await user_model_1.UserModel.findOne({ email });
        if (!alreadyPresent) {
            return res.status(401).send({ "msg": "Register First" });
        }
        bcrypt_1.default.compare(password, alreadyPresent.password, (err, result) => {
            if (result) {
                const token = jwt.sign({ userid: alreadyPresent._id }, process.env.secret_key || "", { expiresIn: "1h" });
                return res.status(200).send({ "msg": "Login successful", alreadyPresent, token });
            }
            else {
                return res.status(401).send({ "msg": "Wrong Credintials" });
            }
        });
    }
    catch (error) {
        console.error(error);
        return res.status(401).json({ msg: error.msg });
    }
});
exports.default = userrouter;
