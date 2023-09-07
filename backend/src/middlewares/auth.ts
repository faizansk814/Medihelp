import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


export const auth=async (req:any,res:Response,next:NextFunction)=>{
    const token:string|undefined=req.headers.authorization?.split(" ")[1]
    if(token){
        const decoded:any=await jwt.verify(token,process.env.secret_key||"")
        if(decoded){
            req.userid=decoded.userid
            next()
        }else{
            return res.status(401).send({"msg":"Login again"})
        }
    }else{
        return res.status(404).send({msg:"Login first"})
    }
}