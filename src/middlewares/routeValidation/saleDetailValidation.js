const { body, param } = require("express-validator");
const { pool } = require("../../database");

const saleDetailValidation = {
    addSaleDetailValidation: [
        body("cantidadVenta").notEmpty().withMessage("La cantidad no puede estar vacio"),
        body("cantidadTipo").notEmpty().withMessage("El tipo de la cantidad no puede estar vacio"),
        body("precioUnitario").notEmpty().withMessage("El precio unitario no puede estar vacio"),
        body("totalVentaIndividual").notEmpty().withMessage("El total de la venta no puede estar vacio"),
        body("idProducto").notEmpty().withMessage("El producto no puede estar vacio").custom(async(value) => {
            const product = await pool.query("SELECT * FROM producto WHERE idProducto = ?", value)
            if (product[0].length === 0) throw new Error("El producto ingresado no existe")
            return true;
        }),
        body("idVenta").notEmpty().withMessage("La venta no puede estar vacio").custom(async(value) => {
            const sale = await pool.query("SELECT * FROM venta WHERE idVenta = ?", [value])
            if (sale[0].length === 0) throw new Error("La venta ingresada no existe")
            return true;
        }),
        body("idBoleta").notEmpty().withMessage("La boleta no puede estar vacio").custom(async(value) => {
            const ticket = await pool.query("SELECT * FROM boleta WHERE idBoleta = ?", [value])
            if (ticket[0].length === 0) throw new Error("La boleta ingresada no existe");
            return true;
        })
    ],
    getSaleDetailByIdValidation: [
        param("idVenta").notEmpty().withMessage("El id de la venta no puede estar vacio").custom(async(value) => {
            const sale = await pool.query("SELECT * FROM venta WHERE idVenta = ?", [value])
            if (sale[0].length === 0) throw new Error("El id de la venta no existe")
            return true;
        })
    ]
}

module.exports = saleDetailValidation;