const { body, param } = require("express-validator");
const { pool } = require("../../database");

const productValidation = {
    addProductValidation: [
        body("nombreProducto").notEmpty().withMessage("EL nombre del producto no puede estar vacio").isLength({max: 250}).withMessage("El nombre del producto puede tener máximo 100 caracteres").custom(async(value) => {
            const nameProduct = await pool.query("SELECT * FROM producto WHERE nombreProducto = ?", [value]);
            if (nameProduct[0].length === 0) return true;
            throw new Error("El nombre del producto ya existe");
        }),
        body("descripcionProducto").isLength({max: 250}).withMessage("La descripción del producto puede tener máximo 250 caracteres"),
        body("stockProducto").notEmpty().withMessage("El stock del producto no puede estar vacio").isInt({min: 1}).withMessage("El stock del producto no puede ser menor de uno"),
        body("precioCProducto").notEmpty().withMessage("El precio de compra no puede estar vacio").isNumeric().withMessage("El precio debe ser un número"),
        body("precioVProducto").notEmpty().withMessage("El precio de venta no puede estar vacio").isNumeric().withMessage("El precio debe ser un número"),
        body("idUbicacion").notEmpty().withMessage("La ubicación no puede estar vacio").custom(async(value) => {
            if (value.toLowerCase() === "vacio") throw new Error("Debe seleccionar una ubicación");

            const ubicacion = await pool.query("SELECT * FROM ubicacion WHERE idUbicacion = ?", [value]);
            if (ubicacion[0].length !== 0) return true;
            throw new Error("La ubicación no existe");
        }),
        body("idCategoria").notEmpty().withMessage("La categoria no puede estar vacio").custom(async(value)=> {
            if (value.toLowerCase() === "vacio") throw new Error("Debe seleccionar una categoria");
            const categoria = await pool.query("SELECT * FROM categoria WHERE idCategoria = ?", [value]);
            if (categoria[0].length !== 0) return true;
            throw new Error("La categoria no existe");
        })
    ],
    getProductByIdValidation: [
        param("idProducto").notEmpty().withMessage("EL id del producto no puede estar vacio").custom(async(value) => {
            const product = await pool.query("SELECT * FROM producto WHERE idProducto = ?", [value]);
            if (product[0].length !== 0) return true;
            throw new Error("No hay producto con ese id");
        })
    ],
    changeProductStatusValidation: [
        param("idProducto").notEmpty().withMessage("EL id del producto no puede estar vacio").custom(async(value) => {
            const product = await pool.query("SELECT * FROM producto WHERE idProducto = ?", [value]);
            if (product[0].length !== 0) return true;
            throw new Error("No hay producto con ese id");
        })
    ],
    updateProductValidation: [
        param("idProducto").notEmpty().withMessage("EL id del producto no puede estar vacio").custom(async(value) => {
            const product = await pool.query("SELECT * FROM producto WHERE idProducto = ?", [value]);
            if (product[0].length !== 0) return true;
            throw new Error("No hay producto con ese id");
        }),
        body("nombreProducto").notEmpty().withMessage("EL nombre del producto no puede estar vacio").isLength({max: 250}).withMessage("El nombre del producto puede tener máximo 100 caracteres").custom(async(value, {req}) => {
            const productRepeat = await pool.query("SELECT * FROM producto WHERE idProducto = ?",[req.params.idProducto]);
            if (productRepeat[0][0].nombreProducto.toLowerCase() === value.toLowerCase()) return true;
            const nameProduct = await pool.query("SELECT * FROM producto WHERE nombreProducto = ?", [value]);
            if (nameProduct[0].length === 0) return true;
            throw new Error("El nombre del producto ya existe");
        }),
        body("descripcionProducto").isLength({max: 250}).withMessage("La descripción del producto puede tener máximo 250 caracteres"),
        body("stockProducto").notEmpty().withMessage("El stock del producto no puede estar vacio").isInt({min: 1}).withMessage("El stock del producto no puede ser menor de uno"),
        body("precioCProducto").notEmpty().withMessage("El precio de compra no puede estar vacio").isNumeric().withMessage("El precio debe ser un número"),
        body("precioVProducto").notEmpty().withMessage("El precio de venta no puede estar vacio").isNumeric().withMessage("El precio debe ser un número"),
        body("idUbicacion").notEmpty().withMessage("La ubicación no puede estar vacio").custom(async(value) => {
            if (value === "vacio" || value === "VACIO") throw new Error("Debe seleccionar una ubicación");

            const ubicacion = await pool.query("SELECT * FROM ubicacion WHERE idUbicacion = ?", [value]);
            if (ubicacion[0].length !== 0) return true;
            throw new Error("La ubicación no existe");
        }),
        body("idCategoria").notEmpty().withMessage("La categoria no puede estar vacio").custom(async(value)=> {
            if (value === "vacio" || value === "VACIO") throw new Error("Debe seleccionar una categoria");
            const categoria = await pool.query("SELECT * FROM categoria WHERE idCategoria = ?", [value]);
            if (categoria[0].length !== 0) return true;
            throw new Error("La categoria no existe");
        })
    ]
};

module.exports = productValidation;