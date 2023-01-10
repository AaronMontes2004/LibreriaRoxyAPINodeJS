const { Router } = require("express");
const { getPurchases } = require("../controllers/purchaseController");

const purchaseRoutes = Router();

purchaseRoutes.get("/", getPurchases);

module.exports = purchaseRoutes;