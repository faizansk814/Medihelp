import mongoose, { Document, Schema } from "mongoose";

export interface Cart extends Document{
    userid:mongoose.Schema.Types.ObjectId,
    productid:mongoose.Schema.Types.ObjectId
    quantity:number
}

const CartSchema:Schema=new Schema({
    userid:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
    productid:{type:mongoose.Schema.Types.ObjectId,ref:"product"},
    quantity:{type:Number,default:1}
})

export let CartModel=mongoose.model<Cart>("cart",CartSchema)