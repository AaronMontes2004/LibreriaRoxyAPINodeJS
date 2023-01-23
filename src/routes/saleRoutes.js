const { Router } = require("express");
const { getSales, addSale } = require("../controllers/saleController");
const { addSaleValidation } = require("../middlewares/routeValidation/saleValidation");

const saleRoutes = Router();

saleRoutes.get("/", getSales)

saleRoutes.post("/", addSaleValidation, addSale);

module.exports = saleRoutes;