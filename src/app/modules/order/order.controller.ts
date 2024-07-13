import { Request, Response } from "express";
import orderValidationSchema from "./order.validation";
import { OrderServices } from "./order.service";
import { TProduct } from "../product/product.interface";
import { Product } from "../product/product.model";

const createOrder = async (req: Request, res: Response) => {

    try {
        const data = req.body;

        const validatedData = orderValidationSchema.parse(data);

        const result = await OrderServices.createOrderIntoDB(validatedData, res);

        if (result === 0) {
            return res.status(404).json({
                success: false,
                message: 'Insufficient quantity available in inventory',
            });
        }

        else if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: result,
        });
    }
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'Order can not be created',
            error: err,
        });
    }

}



export const OrderController = {
    createOrder,
}