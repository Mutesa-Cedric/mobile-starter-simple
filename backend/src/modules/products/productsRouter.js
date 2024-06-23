const express = require("express");
const ProductsController = require("./productsController");
const router = express.Router();

router.post("/", ProductsController.createProduct);
router.get("/", ProductsController.getProducts);
router.put("/:id", ProductsController.updateProduct);
router.delete("/:id", ProductsController.deleteProduct);

const productsRouter = router;
module.exports = productsRouter;