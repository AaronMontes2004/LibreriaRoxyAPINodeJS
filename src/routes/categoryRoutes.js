const { Router } = require("express");
const { getCategories, addCategory, getCategoryById, changeCategoryStatus, getCategoriesDisabled, getCategoriesEnabled, updateCategory } = require("../controllers/categoryController");
const { addCategoriesValidation, getCategoryByIdValidation, changeCategoryStatusValidation, updateCategoryValidation } = require("../middlewares/routeValidation/categoryValidation");

const categoriesRoutes = Router();

categoriesRoutes.get("/",getCategories)

categoriesRoutes.get("/enabled", getCategoriesEnabled)

categoriesRoutes.post("/", addCategoriesValidation, addCategory)

categoriesRoutes.get("/findById/:idCategoria", getCategoryByIdValidation, getCategoryById)

categoriesRoutes.put("/changeStatus/:idCategoria", changeCategoryStatusValidation, changeCategoryStatus)

categoriesRoutes.put("/:idCategoria", updateCategoryValidation, updateCategory)

module.exports = categoriesRoutes; 