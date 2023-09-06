import express, { Request, Response } from 'express';
import { User, UserModel } from '../models/user.model';
import bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const userrouter = express.Router()



userrouter.post("/register", async (req: Request, res: Response) => {
    const { username, email, password }: User = req.body
    try {
        const alreadyPresent = await UserModel.findOne({ email })
        if (alreadyPresent) {
            return res.status(401).send({ "msg": "User already present" })
        }
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                console.log(err)
            } else {
                const newUser: User = new UserModel({ username, email, password: hash })
                await newUser.save()
                return res.status(200).send({ "msg": "Registration Succesful", newUser })
            }
        })

    } catch (error: any) {
        console.error(error)
        return res.status(401).json({ msg: error.msg })
    }
})

userrouter.post("/login", async (req: Request, res: Response) => {
    const { email, password }: User = req.body
    try {
        const alreadyPresent = await UserModel.findOne({ email })
        if (!alreadyPresent) {
            return res.status(401).send({ "msg": "Register First" })
        }
        bcrypt.compare(password, alreadyPresent.password, (err, result: boolean) => {
            if (result) {
                const token: string = jwt.sign({ userid: alreadyPresent._id }, process.env.secret_key || "", { expiresIn: "1h" })
                return res.status(200).send({ "msg": "Login successful", alreadyPresent, token })
            } else {
                return res.status(401).send({ "msg": "Wrong Credintials" })
            }
        })

    } catch (error: any) {
        console.error(error)
        return res.status(401).json({ msg: error.msg })
    }
})

export default userrouter