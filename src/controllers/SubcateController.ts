import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { customerUserReqeust } from "../helpers/secure/jwt";
import { subSchema, subSchemaupdate}  from "../helpers/Schema";
const prisma = new PrismaClient();

// interface

interface newsub {
    subname: string;
    discription?: string;
    subimage : string
}

export const createSub = async (req:customerUserReqeust, res: Response) => {
    try {
        // admin only created

        if (!req.user?.isAdmin) {
            return res.json({
                message: "not Allowed",
                isSuccess: false
            })
        }
        const { error, value } = subSchema.validate(req.body)
        
        if (error) {
            return res.status(400).json({
                error : error.details[0].message
            })
        }
        
        const { subimage, subname, discription } = value as newsub
        
        // checkname
        const checkname = await prisma.subcategory.findFirst({
            where: {
                subname : subname
            }
        })

        if (checkname) {
            return res.status(400).json({
                message: "name is already in the token",
                isSuccess: false
            })
        }

        const newsub = await prisma.subcategory.create({
            data: {
                subname : subname,
                subimage,
                discription,
                userId: +req.user?.userId!,
                cat_catid : req.body.cat_catId   
            }

        })

        res.json({
            result: { ...newsub },
            isSuccess: true
        })


    } catch (error) {
        console.log(error)
        res.json({
            message: "Somthing is wrong",
            isSuccess: false
        })
    }
}

//update

export const updateSub = async (req: customerUserReqeust, res: Response) => {
    try {
        // admin onley created
        if (!req.user?.isAdmin) {
            return res.json({
                message: "not Allowed!",
                isSuccess : false
            })
        }
        const { error, value } = subSchemaupdate.validate(req.body)
        
        if (error) {
            return res.status(400).json({
                error : error.details[0].message
            })
            
        }

        const { subimage, subname, discription } = value as newsub

        //checkname

        const checkname = await prisma.subcategory.findFirst({
            where: {
                subname : subname
            }
        })
        if (checkname) {
            return res.status(400).json({
                message: "name is the already token",
                isSuccess : false

            })
        }
        const newsub = await prisma.subcategory.update({
            where: {
                subId : +req.params.subId
            },
            data: {
                subname: subname,
                subimage,
                discription,
                userId : +req.user?.userId!,

            }

        })
        res.json({
            result: { ...newsub },
            isSuccess : true
        })



    } catch (error) {
        console.log(error)
        res.json({
            message: "somthing is wrong",
            isSuccess : false
        })
        
    }
}

// get one

export const getone = async (req: Request, res: Response) => {
    try {
        const get = await prisma.subcategory.findFirst({
            where: {
                subId: +req.params.subId,
                isDeleted : false
            },
            include: {
                category: true,
                user: {
                    select: {
                        name: true,
                        email: true,
                        userId: true
                    }
                }
            }
        })
        if (!get) {
            return res.json({
                message: "category is the not exist",
                isSuccess : false
            })
        }
        res.json({
            result: { ...get },
            isSuccess : false
        })
   
    } catch (error) {
        res.status(500).json({
            message: "somthing went wrong!",
            isSuccess : false
        })
    }
}

// get Alll

export const getall = async (req: Request, res: Response) => {
    const all = await prisma.subcategory.findMany({
        where: {
            isDeleted : false
        },
        include: {
            category: true,
            user: {
                select: {
                    name: true,
                    email: true,
                    userId: true
                }
            }
        }
    })
    res.json({
        result: [...all],
        isSuccess : true
    })
}

// delete

export const deleted = async (req: Request, res: Response) => {
    try {
        const checkid = await prisma.subcategory.findFirst({
            where: {
                subId: +req.params.subId,
            }
        })
        if (!checkid) {
            return res.status(400).json({
                message: "subId is not axist",
            })

        }
        /// Shaki bilaa xada
        const delets = await prisma.subcategory.delete({
            where: {
               subId : +req.params.subId
           } 
        })
        res.status(200).json({
            result: { ...delets },
            isSuccess : true
        })
        
    } catch (error) {
        res.status(500).json({
            message: "somthing is the went wrong",
           isSuccess: false 
        })
        
    }
}
       
    



