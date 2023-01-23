const { validationResult } = require("express-validator");
const { pool } = require("../database");
const { getSalesQuery, addSaleQuery } = require("../libs/queries/saleQueries");

const getSales = async (req,res) => {
    try {
        const sales = await pool.query(getSalesQuery);

        return res.json({
            status: "OK",
            message: "Se obtuvieron las ventas exitosamente",
            data: sales[0]
        })
    } catch (error) {
        console.log(error);
        res.json({
            status: "DANGER",
            message: "Error interno del servidor, vuelva a intentarlo mas tarde",
            data: error
        })
    }
}

const addSale = async (req, res) => {
    try {
        const err = validationResult(req);

        if (!err.isEmpty()) return res.json({
            status: "FAILED",
            message: err.errors[0].msg,
            data: err
        })

        const { fechaVenta, totalVenta } = req.body;

        const addedSale = await pool.query(addSaleQuery, [fechaVenta, totalVenta]);

        return res.json({
            status: "OK",
            message: "La venta de registró exitosamente",
            data: addedSale[0]
        })

    } catch (error) {
        console.log(error);
        res.json({
            status: "DANGER",
            message: "Error interno del servidor, vuelva a intentarlo mas tarde",
            data: error
        })
    }
}

module.exports = {
    getSales,
    addSale
}