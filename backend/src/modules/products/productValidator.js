const { z } = require('zod');

const productSchema = z.object({
    name: z.string(),
    price: z.number(),
    description: z.string(),
});

const validateProduct = (data) => {
    const product = productSchema.safeParse(data);
    if (!product.success) {
        throw new Error(product.error.errors[0].message);
    }
    return product.data;
};

module.exports = validateProduct;