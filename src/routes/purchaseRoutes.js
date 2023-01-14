const { Router } = require("express");
const { getPurchases, addPurchase } = require("../controllers/purchaseController");
const { addPurchaseValidation } = require("../middlewares/routeValidation/purchaseValidation");

const purchaseRoutes = Router();

purchaseRoutes.get("/", getPurchases);

purchaseRoutes.post("/", addPurchaseValidation, addPurchase)

module.exports = purchaseRoutes;