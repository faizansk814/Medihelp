import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config()

export const connection=mongoose.connect(process.env.url||"")

