const { Router } = require("express");
const { getPurchaseDetail, addPurchaseDetail, getPurchaseById } = require("../controllers/purchaseDetailController");
const { addPurchaseDetailValidation, getPurchaseByIdValidation } = require("../middlewares/routeValidation/purchaseDetailValidation");

const purchaseDetailRoutes = Router();

purchaseDetailRoutes.get("/", getPurchaseDetail)

purchaseDetailRoutes.post("/", addPurchaseDetailValidation, addPurchaseDetail)

purchaseDetailRoutes.get("/findByIdPurchase/:idCompra", getPurchaseByIdValidation, getPurchaseById)

module.exports = purchaseDetailRoutes;