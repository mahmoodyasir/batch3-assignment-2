import { Request, Response } from 'express';
import productValidationSchema from './product.validation';
import { ProductServices } from './product.service';


const createProduct = async (req: Request, res: Response) => {
    try {
        const data = req.body;

        const validatedData = productValidationSchema.parse(data);

        const result = await ProductServices.createProductIntoDB(validatedData);

        res.status(200).json({
            success: true,
            message: 'Product created successfully!',
            data: result,
        });
    }
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'Product can not be created',
            error: err,
        });
    }
}

const getProduct = async (req: Request, res: Response) => {
    try {

        //This if condition part is used for searching by keywords if searchTerm is in query params
        if (req.query.searchTerm) {
            const searchTerm = req.query.searchTerm?.toString().toLowerCase();

            if (!searchTerm) {
                return res.status(400).json({
                    success: false,
                    message: 'SearchTerm query value is required',
                });
            }

            const result = await ProductServices.searchProductByKey(searchTerm);

            return res.status(200).json({
                success: true,
                message: `Products matching search term '${searchTerm}' fetched successfully!`,
                data: result,
            });
        }

        const result = await ProductServices.getProductFromDB();

        res.status(200).json({
            success: true,
            message: 'Products fetched successfully!',
            data: result,
        });
    }
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || req.query.searchTerm ? 'Could not search' :'Products could not be fetched',
            error: err,
        });
    }
}


const getProductById = async (req: Request, res: Response) => {
    try {

        const productId = req.params.productId;

        const result = await ProductServices.getProductById(productId);

        res.status(200).json({
            success: true,
            message: 'Product fetched successfully!',
            data: result,
        });
    }
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'Products couldn not be fetched',
            error: err,
        });
    }
}


const updateProductById = async (req: Request, res: Response) => {
    try {

        const productId = req.params.productId;
        const updateData = req.body;

        const validatedData = productValidationSchema.parse(updateData);

        const result = await ProductServices.updateSingleProductById(productId, validatedData);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product updated successfully!',
            data: result,
        });
    }
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'Products could not be updated',
            error: err,
        });
    }
}


const deleteProductById = async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId;

        const result = await ProductServices.deleteSingleProductById(productId);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully!',
            data: null,
        });

    }
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'product could not be deleted',
            error: err,
        })
    }
}


export const ProductController = {
    createProduct,
    getProduct,
    getProductById,
    updateProductById,
    deleteProductById,
}