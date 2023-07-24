import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

//interface

interface userData {
    userId: number;
    email: string;
    isAdmin : Boolean
}

// generateToken

export const generateToken = (user: userData) => {
    const payload = user
    return jwt.sign(payload, process.env.JWT_Secret|| "JWT_SECRET@#", {
        expiresIn : "60d"
    })
}

// customeruserReuqeust

export interface customerUserReqeust extends Request{
    user?:userData
}

// decodeToken

export const decodetoken = async (req: customerUserReqeust, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.startsWith("Bearer") && req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(401).json({
            message: "Invalid, don't have token",
            isSuccess: false
        })
    }

    const decoded: { userId: number; email: string; isAdmin : Boolean} | any = jwt.verify(token, process.env.JWT_Secret|| "JWT_SECRET@#")
    req.user = { ...decoded }
    next()
    
    } catch (error) {
        console.log(error)
        res.json({
            mesage: "token Error!",
        })
    }
}


////////////////////////////////