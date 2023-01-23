const { body, param } = require("express-validator");
const { pool } = require("../../database");

const ticketValidation = {
    addTicketValidation: [
        body("subtotalBoleta").notEmpty().withMessage("El subtotal no puede estar vacio"),
        body("descuentoBoleta").isNumeric().withMessage("El subtotal debe ser de tipo numérico"),
        body("totalPagarBoleta").notEmpty().withMessage("El total a pagar no puede estar vacio")
    ],
    getTicketByIdValidation: [
        param("idTicket").notEmpty().withMessage("El id de la boleta no puede estar vacio").custom(async(value) => {
            const ticket = await pool.query("SELECT * FROM boleta WHERE idBoleta = ?", [value]);
            if (ticket[0].length === 0) throw new Error("El número de la boleta no existe");
            return true;
        })
    ],
    changeTicketStatusValidation: [
        param("idTicket").notEmpty().withMessage("El id de la boleta no puede estar vacio").custom(async(value) => {
            const ticket = await pool.query("SELECT * FROM boleta WHERE idBoleta = ?", [value]);
            if (ticket[0].length === 0) throw new Error("El número de la boleta no existe");
            return true;
        })
    ],
    showTicketValidation: [
        param("idTicket").notEmpty().withMessage("El id de la boleta no puede estar vacio").custom(async(value) => {
            const ticket = await pool.query("SELECT * FROM boleta WHERE idBoleta = ?", [value]);
            if (ticket[0].length === 0) throw new Error("El número de la boleta no existe");
            return true;
        })
    ]
}

module.exports = ticketValidation;