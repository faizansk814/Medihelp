import mongoose, { Document, Schema } from "mongoose";

export interface Order extends Document{
    userid:mongoose.Schema.Types.ObjectId,
    orderitems:mongoose.Schema.Types.ObjectId[],
    order_data:Date,
    total_amount:Number,
    order_status:String,
    shipping_address:string
}

const OrderSchema:Schema=new Schema({
    userid:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    orderitems:[{type:mongoose.Schema.Types.ObjectId,ref:"cart",required:true}],
    order_date:{type:Date,default:Date.now,required:true},
    total_amount:{type:Number,required:true},
    order_status:{type:String,enum:["recieved","pending","shipped","delivered"],default:"pending",required:true},
    shipping_address:{type:String,required:true}
})

