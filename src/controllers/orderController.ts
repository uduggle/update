import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();


//  Post order

export const newOrder = async (req: Request, res: Response) => {
    try {
        // const { cartId } = req.params
        // const findCart = await prisma.cart.findFirst({
        //     where: {
        //          cartId:+cartId,
        //     },
        //     include: {
        //         cartItem: {
        //             select: {
        //                 product: true,
        //             },
        //         },
        //     },
        // });

        // if (!findCart)
        //     return res.json({
        //         isSuccess: false,
        //         message: 'Cart not found',
        //     });
        
        // const total = findCart.cartItem.reduce(
        //     (prev, current)
        // )
        // const newOrder = await prisma.order.create({

        // })







        
    } catch (error) {
        
    }
}