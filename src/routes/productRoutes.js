const { Router } = require("express");
const { getProducts, addProduct, getProductById, changeProductStatus, updateProduct, getProductByName, getProductsEnabled, getProductByNameEnabled } = require("../controllers/productController");
const { addProductValidation, getProductByIdValidation, changeProductStatusValidation, updateProductValidation } = require("../middlewares/routeValidation/productValidation");

const productRoutes = Router();

productRoutes.get("/", getProducts);

productRoutes.get("/enabled", getProductsEnabled)

productRoutes.post("/", addProductValidation, addProduct);

productRoutes.get("/findById/:idProducto", getProductByIdValidation, getProductById);

productRoutes.get("/findByName/:nombreProducto", getProductByName)

productRoutes.get("/findByName/enabled/:nombreProducto", getProductByNameEnabled)

productRoutes.put("/changeStatus/:idProducto", changeProductStatusValidation, changeProductStatus)

productRoutes.put("/:idProducto", updateProductValidation, updateProduct)

module.exports = productRoutes;