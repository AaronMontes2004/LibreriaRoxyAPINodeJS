const { body, param } = require("express-validator");
const { pool } = require("../../database");

const categoryValidation = {
    
    // Validació para el registro de categoria

    addCategoriesValidation: [
        body("nombreCategoria")
        .trim()
        .notEmpty()
        .withMessage("El nombre de la categoria no puede estar vacio")
        .isString()
        .withMessage("El nombre de la categoria debe ser un texto")
        .isLength({ max: 25 })
        .withMessage("El nombre de la categoria debe tener menos de 25 caracteres")
        .custom(async (value) => {
            const category = await pool.query("SELECT * FROM categoria WHERE nombreCategoria = ? ;",
            [value.toLowerCase()]);
            if (category[0].length === 0) return true;
            throw new Error("El nombre de la categoria ya existe");
        }),
    ],

    getCategoryByIdValidation: [
        param("idCategoria").notEmpty().withMessage("EL id de la categoria no puede estar vacio").custom(async(value) => {
            const category = await pool.query("SELECT * FROM categoria WHERE idCategoria = ?", [value]);
            if (category[0].length !== 0) return true;
            throw new Error("No hay categoria con ese id");
        })
    ],

    changeCategoryStatusValidation: [
        param("idCategoria").notEmpty().withMessage("EL id de la categoria no puede estar vacio").custom(async(value) => {
            const category = await pool.query("SELECT * FROM categoria WHERE idCategoria = ?", [value]);
            if (category[0].length !== 0) return true;
            throw new Error("No hay categoria con ese id");
        })
    ],

    updateCategoryValidation: [
        body("nombreCategoria")
        .trim()
        .notEmpty()
        .withMessage("El nombre de la categoria no puede estar vacio")
        .isString()
        .withMessage("El nombre de la categoria debe ser un texto")
        .isLength({ max: 25 })
        .withMessage("El nombre de la categoria debe tener menos de 25 caracteres")
        .custom(async (value, {req}) => {
            const repeatCategory = await pool.query("SELECT * FROM categoria WHERE idCategoria = ?", [req.params.idCategoria]);

            if (repeatCategory[0][0].nombreCategoria.toLowerCase() === value.toLowerCase()) return true;

            const category = await pool.query("SELECT * FROM categoria WHERE nombreCategoria = ? ;",
            [value.toLowerCase()]);
            console.log(req.params);
            if (category[0].length === 0) return true;
            throw new Error("El nombre de la categoria ya existe");
        })
    ]
};

module.exports = categoryValidation;
