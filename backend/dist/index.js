"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./connection/db");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const cors_1 = __importDefault(require("cors"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const auth_1 = require("./middlewares/auth");
const cart_router_1 = __importDefault(require("./routes/cart.router"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send({ "msg": "hello" });
});
app.use("/user", user_routes_1.default);
app.use("/product", product_routes_1.default);
app.use(auth_1.auth);
app.use("/cart", cart_router_1.default);
app.listen(4031, async () => {
    try {
        await db_1.connection;
        console.log("connected");
    }
    catch (error) {
        console.log(error);
    }
    console.log("connected to server");
});
