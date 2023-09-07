import express, { Request, Response } from 'express'

const orderrouter=express.Router()

orderrouter.get("/get",(req:Request,res:Response)=>{
    return res.status(200).send({msg:"welcome"})
})

export default orderrouter