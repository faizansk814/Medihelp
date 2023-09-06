import mongoose, { Document, Schema } from "mongoose";

export interface Product extends Document{
    name:String,
    description:String,
    price:Number,
    category:string,
    image:string
}

const ProductSchema:Schema=new Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    category:{type:String,required:true},
    image:{type:String,required:true},
})

export let ProductModel=mongoose.model<Product>("product",ProductSchema)