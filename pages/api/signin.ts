import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prisma from "../../lib/prisma";
import jwt from 'jsonwebtoken';
import cookie from 'cookie'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    
    if(user && bcrypt.compareSync(password, user.password)) {   
        const token = jwt.sign({
            email: user.email,
            id: user.id,
            time: Date.now(),
        }, "hello", { expiresIn: "8h" })
        
        res.setHeader(
            'Set-Cookie',
            cookie.serialize('ACCESS_TOKEN', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 8,
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        }))
        res.json(user);
    } else {
        res.status(401).json({
            error: "email or passowrd is wrong",
        });
    }

};
