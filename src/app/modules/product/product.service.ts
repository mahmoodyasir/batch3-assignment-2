import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductIntoDB = async (productData: TProduct) => {
    const result = await Product.create(productData);
    return result;
}

const getProductFromDB = async () => {
    const result = await Product.find();
    return result;
}

const getProductById = async (productId: string) => {
    const result = await Product.findById(productId);
    return result;
}


const updateSingleProductById = async (productId: string, updatedData: TProduct) => {
    const result = await Product.findByIdAndUpdate(productId, updatedData, {
        new: true,
    });

    return result;
}


const deleteSingleProductById = async (productId: string) => {
    const result = await Product.findByIdAndDelete(productId);
    return result;
}

export const ProductServices = {
    createProductIntoDB,
    getProductFromDB,
    getProductById,
    updateSingleProductById,
    deleteSingleProductById,
}