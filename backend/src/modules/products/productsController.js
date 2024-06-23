const { validateProduct } = require('./productValidator');
const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

async function createProduct(req, res) {
    try {
        const product = validateProduct(req.body);
        const createdBy = await prismaClient.user.findUnique({
            where: {
                id: req.user
            }
        })
        if (!createdBy) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const newProduct = await prismaClient.product.create({
            data: {
                ...product,
                createdBy: { connect: { id: createdBy.id } }
            }
        });

        res.status(201).json({
            success: true,
            product: newProduct
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
async function getProducts(req, res) {
    try {
        const createdBy = await prismaClient.user.findUnique({
            where: {
                id: req.user
            }
        })
        if (!createdBy) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const products = await prismaClient.product.findMany({
            where: {
                createdBy: {
                    id: createdBy.id
                }
            }
        });
        res.status(200).json({
            success: true,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
async function updateProduct(req, res) {
    try {
        const productId = req.params.id;
        const product = validateProduct(req.body);

        const existingProduct = await prismaClient.product.findUnique({
            where: {
                id: productId
            }
        });
        if (!existingProduct) {
            return res.status(404).json({
                message: "Product not found"
            })
        }
        // @ts-ignore
        if (existingProduct.userId !== req.user) {
            return res.status(403).json({
                message: "Forbidden"
            })
        }
        const updatedProduct = await prismaClient.product.update({
            where: {
                id: productId,
            },
            data: product
        });

        res.status(200).json({
            success: true,
            updatedProduct
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

async function deleteProduct(req, res) {
    try {
        const productId = req.params.id;

        const createdBy = await prismaClient.user.findUnique({
            where: {
                // @ts-ignore
                id: req.user
            }
        })
        if (!createdBy) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        const product = await prismaClient.product.delete({
            where: {
                id: productId,
                userId: createdBy.id
            }
        });
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            })
        }
        res.status(200).json({
            success: true,
            product
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}


module.exports = {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct
}