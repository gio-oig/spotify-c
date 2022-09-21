import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prisma from "../../lib/prisma";
import jwt from 'jsonwebtoken';
import cookie from 'cookie'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const salt = bcrypt.genSaltSync()
    const { email, password } = req.body;
    let user;

    try {
    user = await prisma.user.create({
        data: {
            email: email,
            password: bcrypt.hashSync(password, salt)
        }
    })
    } catch (error) {
        res.status(401)
        return res.json({
            error: "Could not create user",
        })
    }

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
};
