const { Router } = require("express");
const { getSaleDetail, addSaleDetail, getSaleDetailById } = require("../controllers/saleDetailController");
const { addSaleDetailValidation, getSaleDetailByIdValidation } = require("../middlewares/routeValidation/saleDetailValidation");

const saleDetailRoutes = Router();

saleDetailRoutes.get("/", getSaleDetail)

saleDetailRoutes.post("/", addSaleDetailValidation, addSaleDetail)

saleDetailRoutes.get("/findByIdSale/:idVenta", getSaleDetailByIdValidation, getSaleDetailById)

module.exports = saleDetailRoutes;