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


export const ProductController = {
    createProduct,
}