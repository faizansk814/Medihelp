import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document{
    username?:string,
    email:string,
    password:string
}

const UserSchema:Schema=new Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
})

export  let UserModel=mongoose.model<User>('user',UserSchema)