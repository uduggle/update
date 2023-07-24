import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcryp from "bcryptjs";
import { registerSchema,  } from "../helpers/Schema";
import { generateToken } from "../helpers/secure/jwt";
const prisma = new PrismaClient();


// interface

export const register = async (req: Request, res: Response) => {
    try {
        const { error, value } = registerSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });

        }
        const { name, email, password } = value;

        // cheack email

        const cheackemail = await prisma.user.findFirst({
            where: {
                email

            }
        })
        if (cheackemail) {
            return res.json({
                message: "email is Already",
                isSuccess: false
            })
        }
     
        // hashpass
      
        const hashpass = bcryp.hashSync(password)
        const newuser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashpass,
                isAdmin: email === "uduggle1@gmail.com"
            
              
            }
        })

        res.json({
            isSuccess: true,
            result: { ...newuser }
        })

    




  } catch (error) {
      res.json({
          message: "somthing wrong",
          isSucess:false
    })
  }
}


// login

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.json({
                message: "please Provide info",
                isSuccess : false
            })
        }
        const user = await prisma.user.findFirst({
            where: {
                email
            }

        })
        if (!user) {
            return res.json({
                message: "somthing went",
                isSuccess : false
            })
        }
        // dahashed
        const dehashed = bcryp.compareSync(password, user.password)
        
        if (!dehashed) {
            return res.json({
                message: "somthing went wrong",
                isSuccess: false
                
            })
        }
        const result = {
            email: user.email,
            name: user.name,
            createdAt : user.create_at,
            token: generateToken({
                userId: user.userId,
                isAdmin: user.isAdmin,
                email: user.email,
            })

        }
        res.json({
            result: { ...result },
            isSuccess : true
        })
    } catch (error) {
        res.json({
            message : "somthing is wrong",
        })
    }
}

// update isAdmin

export const isAdmin = async (req: Request, res: Response) => {
    try {
    //     if (!req.user?.isAdmin) {
    //         return res.status(405).json({
             
    //      }) 
    //   }

        const user = await prisma.user.findFirst({
            where: {
            userId : +req.params?.userId
            }       
        })
        if(!user) {
            return res.json({
                message: "userId is not axist",
                isSuccess : false
                })
        }
        
        const updated = await prisma.user.update({
            where: {
                userId : +req.params?.userId
            },
            data: {
                isAdmin : !user.isAdmin
            }
           
        })
        res.json({
            result: { ...updated },
            isSuccess : true
        })
    } catch (error) {
        res.json({
            message: "somthing is failed",
            isSuccess : false
        })
  } 
}

// get one 
export const getone = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                userId : +req.params.userId
            }
        })
        if (!user) {
            return res.json({
                message: "userId is not the database",
                isSuccess: false
            })
        }
        const result = {
            userId: user.userId,
            name: user.name,
            email: user.email,
            createdAt : user.create_at,
        }
        res.json({
            result: { ...result },
            isSuccess :true
        })
    } catch (error) {
        res.json({
            message: "is somthing failed",
            isSuccess : false
        })
    }
}

// get all user

export const getall = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findMany({
            select: {
                email: true,
                name: true,
                create_at: true,
                updatedAt: true,
                isAdmin:true
        }
        })
        res.json({
            result: [...user],
            isSuccess : true
        })
    } catch (error) {
        res.json({
            message: "is somthing failed",
            isSuccess : false
        })
    }
}
