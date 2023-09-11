import razorpay from "razorpay";
import express, { Request, Response } from "express";
import crypto from 'crypto'
import dotenv from 'dotenv'
dotenv.config()
const paymentrouter = express.Router();

paymentrouter.post("/orders", (req: Request, res: Response) => {
  let instance = new razorpay({
    key_id: process.env.KEY_ID||"",
    key_secret: process.env.KEY_SECRET||""
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

paymentrouter.post("/verify",(req,res)=>{
    let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

    var expectedSignature = crypto.createHmac('sha256', process.env.KEY_SECRET||"")
        .update(body.toString())
        .digest('hex');

    if (expectedSignature === req.body.response.razorpay_signature) {
        res.send({ code: 200, message: 'Sign Valid' });
    } else {

        res.send({ code: 500, message: 'Sign Invalid' });
    }
})

export default paymentrouter