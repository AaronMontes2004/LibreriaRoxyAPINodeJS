const { Router } = require("express");

const productRoutes = Router();

productRoutes.get("/", async (req,res) => {
    res.json("EMPEZAMOS")
})

module.exports = productRoutes;