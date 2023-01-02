const { Router } = require("express");
const { getCategories, addCategory } = require("../controllers/categoryController");
const { addCategoriesValidation } = require("../middlewares/routeValidation/categoryValidation");

const categoriesRoutes = Router();

categoriesRoutes.get("/",getCategories)

categoriesRoutes.post("/", addCategoriesValidation, addCategory)

module.exports = categoriesRoutes; 