import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express"
import { customerUserReqeust } from "../helpers/secure/jwt";
const prisma = new PrismaClient();

export const create = async (req: customerUserReqeust, res: Response) => {
    try {
        if (!req.user?.isAdmin) {
            return res.status(405).json({
                message: "Not allowes",
                isSuccess : false
            })
        }
        const { cat_type } = req.body
        
        if (!cat_type) {
            return res.status(400).json({
                message: "please ser cat_type",
                isSuccess: false
            })
        }

        // check cat_type @unique

        const newcat = await prisma.category.create({
            data: {
                cart_type:cat_type,
                userId : req.user?.userId!
            }
        })

        res.json({
            result: { ...newcat },
            isSuccess : true
        })

    } catch (error) {
        res.status(500).json({
            message: "Somthing wrong!",
            isSuccess : false
        })
    }
}

/// update catogory

export const updatecat = async (req: customerUserReqeust, res: Response) => {
    try {
        
        if (!req.user?.isAdmin) {
            return res.status(405).json({
                message: "Not Allowed!",
                isSuccess : false
            })
        }
        const { cat_type } = req.body
        
        if (!cat_type) {
            return res.status(400).json({
                message: "Please ser cat_type",
                isSuccess: false
            })
        }
        
        //check
        
        const check = await prisma.category.findFirst({
            where: {
                catid : +req.params.catId
            }
        })

        // check_cat_type @unique

        const check_cat_type = await prisma.category.findFirst({
            where: {
                cart_type:cat_type
            }
        })

        if (!check) {
            return res.status(400).json({
                message: "catagory is not exist",
                isSuccess : false
            })
        }
        if (check_cat_type) {
            return res.status(409).json({
                message: " type is already used",
                isSuccess: false
            })
        }

        // create cat_ type

        const updated = await prisma.category.update({
            where: {
                catid : +req.params.catId
            },
            data: {
                cart_type: cat_type,
                userId : +req.user?.userId!
            }
        })

        res.json({
            result: { ...updated },
            isSuccess : true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
             message: "Somthing went wrong!",
            isSuccess : false
        })
    }
}


// get one

export const getone = async (req: customerUserReqeust, res: Response) => {
    try {
        const get = await prisma.category.findFirst({
            where: {
                catid : +req.params.catid
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        userId: true,
                    }
                }
            }
        })
        if (!get) {
            return res.json({
                message: "category is not axist",
                isSuccess: false
            })
        }
        res.json({
            result: { ...get },
            isSuccess : false
        })

    } catch (error) {
        res.status(500).json({
            message: "Somthing went wrong!",
            isSuccess :false
        })
    }
}


// getAll

export const getall = async (req: customerUserReqeust, res: Response) => {
    const all = await prisma.category.findMany({
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                    userId: true,
                    
                }
            }
        }
    })
    res.json({
        resoult: [...all],
        isSuccess: true
    })
    
}