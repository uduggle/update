import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { customerUserReqeust } from "../helpers/secure/jwt";
const prisma = new PrismaClient()

/// create new cart

export const createcart = async (req: customerUserReqeust, res: Response) => {
    try {
        const newcart = await prisma.cart.create({
            data: {
                autherId : req.user?.userId!
            }
        })
        res.json({
            result: { ...newcart },
            isSuccess: true
        })

    } catch (error) {
        res.json({
            message: "Faild the create cart",
            isSuccess: false
            
        })
    }
}

// all carts

export const allcart = async (req: customerUserReqeust, res: Response) => {
    try {
        const all = await prisma.cart.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        userId: true
                    }
                },
                cartItem: {
                    select: {
                        cartId: true,
                        product: {
                            select: {
                                proDescription: true,
                                proname: true,
                                proId: true,
                                proimage: true,
                                proPrice: true,
                                proStock: true
                            }
                        }
                    }
                }
            }
        })

    } catch (error) {
        res.json({
            message: "Failed to create cart!",
            isSuccess: false

        })
        
    }
}


// add To cart

export const addToCart = async (req: customerUserReqeust, res: Response) => {
    try {
        let userCart = await prisma.cart.findFirst({
            where: {
                autherId :req.user?.userId!
            }
        })
        if (!userCart) {
            userCart = await prisma.cart.create({
                data: {
                    autherId: req.user?.userId!
                }
            })
        }
        //add cart

        const add = await prisma.cartItem.create({
            data: {
                cartId: userCart.cartId,
                proId : +req.body.proId
            }
        })
        res.json({
            result: { ...add },
            isSuccess: true
        })
        
    } catch (error) {
        res.json({
            message: "not found addcart",
            isSuccess: false
        })
        
    }
}
