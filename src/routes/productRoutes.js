const { Router } = require("express");
const { getProducts, addProduct, getProductById, changeProductStatus, updateProduct } = require("../controllers/productController");
const { addProductValidation, getProductByIdValidation, changeProductStatusValidation, updateProductValidation } = require("../middlewares/routeValidation/productValidation");

const productRoutes = Router();

productRoutes.get("/", getProducts);

productRoutes.post("/", addProductValidation, addProduct);

productRoutes.get("/findById/:idProducto", getProductByIdValidation, getProductById)

productRoutes.put("/changeStatus/:idProducto", changeProductStatusValidation, changeProductStatus)

productRoutes.put("/:idProducto", updateProductValidation, updateProduct)

module.exports = productRoutes;