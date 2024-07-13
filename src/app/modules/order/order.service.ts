import { Response } from "express";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";
import { Product } from "../product/product.model";
import { TProduct } from "../product/product.interface";

const createOrderIntoDB = async (orderData: TOrder, res: Response) => {

    const quantity = orderData.quantity

    const productData = await Product.findById(orderData.productId);

    if (productData) {
        const finalQuantity = productData.inventory.quantity - quantity

        if (finalQuantity < 0) {

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



export const OrderServices = {
    createOrderIntoDB,
}