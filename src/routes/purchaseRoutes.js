const { Router } = require("express");
const { getPurchases, addPurchase, updatePurchase } = require("../controllers/purchaseController");
const { addPurchaseValidation, updatePurchaseValidation } = require("../middlewares/routeValidation/purchaseValidation");

const purchaseRoutes = Router();

purchaseRoutes.get("/", getPurchases);

purchaseRoutes.post("/", addPurchaseValidation, addPurchase)

purchaseRoutes.put("/:idCompra", updatePurchaseValidation, updatePurchase)

module.exports = purchaseRoutes;