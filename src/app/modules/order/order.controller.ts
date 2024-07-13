import { Request, Response } from "express";
import orderValidationSchema from "./order.validation";
import { OrderServices } from "./order.service";

const createOrder = async (req: Request, res: Response) => {

    try {
        const data = req.body;

        const validatedData = orderValidationSchema.parse(data);

        const result = await OrderServices.createOrderIntoDB(validatedData);

        if (result === 0) {
            return res.status(500).json({
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


const getOrder = async (req: Request, res: Response) => {

    try {

        if (req.query.email) {

            const email = req.query.email?.toString().toLowerCase();

            if (!email) {
                return res.status(400).json({
                    success: false,
                    message: 'email query value is required',
                });
            }

            const result = await OrderServices.getOrderByUser(email);

            return res.status(200).json({
                success: true,
                message: 'Orders fetched successfully for user email!',
                data: result,
            });

        }
        
        const result = await OrderServices.getOrderFromDB();

        res.status(200).json({
            success: true,
            message: 'Orders fetched successfully!',
            data: result,
        });

    }
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'Orders could not be fetched',
            error: err,
        });
    }

}

export const OrderController = {
    createOrder,
    getOrder,
}