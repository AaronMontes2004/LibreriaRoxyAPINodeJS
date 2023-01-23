const { body } = require("express-validator");

const saleValidation = {
    addSaleValidation: [
        body("fechaVenta").notEmpty().withMessage("La fecha de la venta no puede estar vacio").isDate().withMessage("Lo ingresado no tiene formato de una fecha"),
        body("totalVenta").notEmpty().withMessage("El total de la venta no puede estar vacio").isNumeric().withMessage("El total de venta debe ser en números")
    ]
}

module.exports = saleValidation;