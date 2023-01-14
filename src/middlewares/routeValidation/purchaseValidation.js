const { body } = require("express-validator");
const { pool } = require("../../database");


const purchaseValidation = {
    addPurchaseValidation: [
        body("totalPagar").notEmpty().withMessage("El precio total no puede estar vacio").isNumeric().withMessage("El precio total debe ser en números"),
        body("idProveedor").notEmpty().withMessage("Debe ingresar un proveedor").custom(async(value) => {
            if (value.toLowerCase() === "vacio") throw new Error("Debe seleccionar un proveedor");
            const provider = await pool.query("SELECT * FROM proveedor WHERE idProveedor = ?;", [value]);
            if (provider[0].length === 0) throw new Error("El proveedor ingresado no existe");
            return true;
        })
    ]
}

module.exports = purchaseValidation;