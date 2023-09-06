import express,{Request,Response} from 'express';

import { connection } from './connection/db';
import userrouter from './routes/user.routes';
import cors from 'cors'
import productrouter from './routes/product.routes';

const app=express()

app.use(express.json())
app.use(cors())
app.get("/",(req:Request,res:Response)=>{
    res.send({"msg":"hello"})
})

app.use("/user",userrouter)
app.use("/product",productrouter)

app.listen(4031,async ()=>{
    try {
        await connection
        console.log("connected")
    } catch (error) {
        console.log(error)
    }
    console.log("connected to server")
    
})