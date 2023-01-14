const { body, param } = require("express-validator");
const { pool } = require("../../database");

const purchaseDetailValidation = {
    addPurchaseDetailValidation: [
        body("cantidadCompra").notEmpty().withMessage("La cantidad no puede estar vacio").isInt().withMessage("La cantidad debe ser un número entero").isInt({min: 1}).withMessage("La cantidad no puede ser menor a 1"),
        body("precioUnitarioCompra").notEmpty().withMessage("El precio unitario no puede estar vacio").isNumeric().withMessage("El precio unitario debe ser en números"),
        body("totalCompra").notEmpty().withMessage("El total de la compra no puede estar vacio").isNumeric().withMessage("El total de la compra debe ser en números"),
        body("idCompra").notEmpty().withMessage("La compra ingresada no existe").isInt().withMessage("El id de la compra debe ser un número entero").custom(async(value) => {
            const compra = await pool.query("SELECT * FROM compra WHERE idCompra = ?", [value])

            if (compra[0].length === 0) throw new Error("La compra ingresada no existe")

            return true;
        }),
        body("idProducto").notEmpty().withMessage("El producto ingresado no existe").isInt().withMessage("El id del producto debe ser un número entero").custom(async(value) => {
            const producto = await pool.query("SELECT * FROM producto WHERE idProducto = ?", [value])

            if (producto[0].length === 0) throw new Error("El producto ingresado no existe")

            return true;
        })
    ],
    getPurchaseByIdValidation: [
        param("idCompra").notEmpty().withMessage("El id de la compra no puede estar vacio").isInt().withMessage("El id de la compra debe ser un número entero").custom(async(value) => {
            const purchase = await pool.query("SELECT * FROM compra WHERE idCompra = ?", [value])
            if (purchase[0].length === 0) throw new Error("No existe ese número de compra")
            return true;
        })
    ]
}

module.exports = purchaseDetailValidation;