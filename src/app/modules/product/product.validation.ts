import { z } from 'zod';

const variantSchema = z.object({
    type: z.string(),
    value: z.string(),
});

const inventorySchema = z.object({
    quantity: z.number(),
    inStock: z.boolean(),
});

const productValidationSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    category: z.string(),
    tags: z.array(z.string()),
    variants: z.array(variantSchema),
    inventory: inventorySchema,
});

export default productValidationSchema;