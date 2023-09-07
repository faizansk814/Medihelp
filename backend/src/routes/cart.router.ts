import express, { Request, Response } from "express";
import { Cart, CartModel } from "../models/cart.model";

const cartrouter=express.Router()

cartrouter.post("/add/:id",async (req:any,res:Response)=>{
    const {id}=req.params
    try {
        const alreadypresentproduct:Cart|null=await CartModel.findOne({userid:req.userid,productid:id})
        if(alreadypresentproduct){
            return res.status(401).send({"msg":"Product already in cart"})
        }
        const newProduct:Cart|any=new CartModel({userid:req.userid,productid:id})
        await newProduct.save()
        return res.status(200).send({"msg":"product added to cart",newProduct})
    } catch (error:any) {
        return res.status(401).send({"msg":error.message})
        
    }
    
})

cartrouter.get("/get",async (req:any,res:Response)=>{
    try {
        const userallProducts:Cart[]=await CartModel.find({userid:req.userid}).populate("productid")
        return res.status(200).send(userallProducts)
    } catch (error:any) {
        return res.status(401).send({"msg":error.message})
    }
})

cartrouter.delete("/delete/:id",async (req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const deleteproduct:any=await CartModel.findOneAndDelete({_id:id})
        return res.status(200).send({"msg":"Product cart deleted"})
    } catch (error:any) {
        return res.status(401).send({"msg":error.message})
    }
})

cartrouter.patch("/inc/:id",async (req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const updataUserCart=await CartModel.findOneAndUpdate({_id:id},{$inc:{quantity:1}})
        return res.status(200).send({msg:"Qunatity increased"})
    } catch (error:any) {
        return res.status(401).send({"msg":error.message})
    }
})

cartrouter.patch("/dec/:id",async (req:any,res:Response)=>{
    try {
        const {id}=req.params
        const product:Cart|null=await CartModel.findById(id)
        if(product?.quantity==1){
            return res.status(401).send({msg:"You cannot decreament further"})
        }else{
            const updataUserCart=await CartModel.findOneAndUpdate({_id:id},{$inc:{quantity:-1}})
            return res.status(200).send({"msg":"Deacrement successfully"})
        }
    } catch (error:any) {
        return res.status(401).send({"msg":error.message})
    }
})


export default cartrouter