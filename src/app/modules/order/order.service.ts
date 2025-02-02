import { Response } from "express";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";
import { Product } from "../product/product.model";

const createOrderIntoDB = async (orderData: TOrder) => {

    const quantity = orderData.quantity

    const productData = await Product.findById(orderData.productId);

    if (productData) {
        const finalQuantity = productData.inventory.quantity - quantity

        if (finalQuantity < 0) {
            // Here returning 0 to throw Insufficient quantity error in controller 
            return 0;

        }

        else if (finalQuantity > 0) {
            productData.inventory.quantity = finalQuantity;
            await productData.save();
        }

        else if (finalQuantity === 0) {
            productData.inventory.quantity = finalQuantity;
            productData.inventory.inStock = false
            await productData.save();
        }

        const result = await Order.create(orderData);
        return result;

    }

    else {
        return productData;
    }

}


const getOrderFromDB = async () => {
    const result = await Order.find();
    return result;
}


const getOrderByUser = async (email: string) => {

    const result = await Order.find({ email });
    return result;
}

export const OrderServices = {
    createOrderIntoDB,
    getOrderFromDB,
    getOrderByUser,
}