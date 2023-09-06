import express, { Request, Response } from 'express';
import dotenv from 'dotenv'
import { Product, ProductModel } from '../models/product.model';
dotenv.config()

const productrouter = express.Router()



productrouter.post("/add",async (req:Request,res:Response)=>{
    const {name,description,price,category,image}:Product=req.body
    try {
        const newProduct:Product=new ProductModel({name,description,price,category,image})
        await newProduct.save()
        return res.status(200).send({"msg":"Product added successfully"})

    } catch (error:any) {
        return res.status(401).send({msg:error.message})
    }
})

productrouter.get("/get",async (req:Request,res:Response)=>{
    try {
        const data:Product[]=await ProductModel.find()
        return res.status(200).send(data)

    } catch (error:any) {
        return res.status(401).send({msg:error.message})
    }
})

productrouter.get("/part/:id",async (req:Request,res:Response)=>{
    const {id}=req.params
    try {
        const data:Product|null=await ProductModel.findById(id)
        return res.status(200).send(data)
    } catch (error:any) {
        return res.status(401).send({msg:error.message})
    }
})

export default productrouter