import { PrismaClient } from "@prisma/client";
import { customerUserReqeust } from "../helpers/secure/jwt";
import { Request, Response } from "express";
import { createProduct, updateProduct } from "../helpers/Schema";
import { string } from "joi";
const prisma = new PrismaClient()

// interface Product

interface productNew{
    proname: string
    proStock: number
    proPrice: number
    proimage: string
     proDescription?: string
}

// create Product

export const createPro = async (req: customerUserReqeust, res: Response) => {
    try {
        if (!req.user?.isAdmin) {
            return res.status(405).json({
                message: "not is allowed",
                isSuccess : false
            })
        }

        const { error, value } = createProduct.validate(req.body)
        
        if (error) {
            return res.status(400).json({
                error: error.details[0].message
            })
        }

        const { proPrice,  proDescription, proimage, proname, proStock} = value as productNew
        
        // create New Product

        const newpro = await prisma.product.create({
            data :{
                proname,
                proPrice,
                proStock,
                proDescription,
                proimage,
                autherId: +req.user?.userId!,
                subId : +req.body.subId,

           } 
        })
        res.json({
            result: { ...newpro },
            isSuccess : true
        })

    } catch (error) {
        res.status(500).json({
           message : "somthing is the wrong",
       }) 
    }
}
//Product update
export const updatePro = async (req: customerUserReqeust, res: Response) => {
    try {
        if (!req.user?.isAdmin) {
            return res.status(405).json({
                message: "not is Allowed",
                isSuccess: false
            })
        }

        const { error, value } = updateProduct.validate(req.body)
        
        if (error) {
            return res.status(400).json({
                error : error.details[0].message
            })
            
        }
        const { proDescription, proStock, proimage, proname,proPrice } = value
        
        //create New Product

        const newpro = await prisma.product.update({
            where: {
                proId: +req.params?.proId
            },
            data: {
                proDescription,
                proname,
                proPrice,
                proStock,
                proimage,
            }
        })
        res.json({
            result: { ...newpro },
            isSuccess: true
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "something is the wrong",
            isSuccess: false
        })
        
    }
    
}

// get one product

export const getone = async (req: Request, res: Response) => {
    try {
        const getone = await prisma.product.findFirst({
            where: {
                proId: +req.params.proId,
                isDeleted:false
            },
            include: {
                subcate: true,
                user: {
                    select: {
                        name: true,
                        email: true,
                        userId : true
                    }
                }
            }
        })
        res.json({
            result: {...getone},
            isSuccess: true
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Something is the wrong!",
            isSuccess : false

        })
    }
}

//get all

export const getall = async (req: Request, res: Response) => {
    try {
        const all = await prisma.product.findMany({
            where: {
                isDeleted:false
            },
            include: {
                subcate: true,
                user: {
                    select: {
                        name: true,
                        email: true,
                        userId : true
                    }
                }
            }
        })
        res.json({
            result: [...all],
            isSuccess: true
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Something is the wrong!",
            isSuccess : false

        })
    }
}


//////////////////////////////// soft delete

export const softdel = async (req: Request, res: Response) => {
    try { 
        const cheicker = await prisma.product.findFirst({
            where: {
                proId: +req.params.proId,
                isDeleted : false
            }
        })
        if (!cheicker) {
            return res.json({
                message: "not axist ID",
                isSuccess:false
            })
        }
        //softed
        const softed = await prisma.product.update({
            where: {
                proId : +req.params.proId
            },
            data: {
                isDeleted : true
                
            }
        })
        res.json({
            result: { ...softed },
            isSuccess: true
        })
    } catch (error) {
         res.status(500).json({
            message: "Something is the wrong!",
            isSuccess : false
        })
    }
}


// alll get soft delete


export const getallsoft = async (req: Request, res: Response) => {
    try {
        const all = await prisma.product.findMany({
            where: {
                isDeleted:true
            },
        })
        res.json({
            result: [...all],
            isSuccess: true
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Something is the wrong!",
            isSuccess : false

        })
    }
}

//restoring product

export const restoring = async (req: Request, res: Response) => {
    try { 
        const cheicker = await prisma.product.findFirst({
            where: {
                proId: +req.params.proId,
                isDeleted : true
            }
        })
        if (!cheicker) {
            return res.json({
                message: "not axist ID",
                isSuccess:false
            })
        }
        //softed
        const softed = await prisma.product.update({
            where: {
                proId : +req.params.proId
            },
            data: {
                isDeleted : false
            }
        })
        res.json({
            result: { ...softed },
            isSuccess: true
        })
    } catch (error) {
         res.status(500).json({
            message: "Something is the wrong!",
            isSuccess : false
        })
    }
}

//delete

export const deleting = async (req: customerUserReqeust, res: Response) => {
    try {
        
        if (!req.user?.isAdmin) {
            return res.json({
                messaeg: "not allowed",
                isSuccess : false
            })
        }
          const cheicker = await prisma.product.findFirst({
            where: {
                proId: +req.params.proId,
                isDeleted : true
            }
        })
        if (!cheicker) {
            return res.json({
                message: "not axist ID",
                isSuccess:false
            })
        }
        // delete
        const deleted = await prisma.product.delete({
            where: {
                proId: +req.params.proId
            }
        })
        res.json({
            result: { ...deleted },
            isSuccess : true
        })
    } catch (error) {
         res.status(500).json({
            message: "Something is the wrong!",
            isSuccess : false
        })
    }
}
