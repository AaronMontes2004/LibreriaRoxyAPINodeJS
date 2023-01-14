const { validationResult } = require("express-validator");
const { pool } = require("../database");
const { getPurchasesQuery, addPurchaseQuery } = require("../libs/queries/purchaseQueries");

const getPurchases = async (req,res) => {
    try {
        const purchases = await pool.query(getPurchasesQuery);

        return res.json({
            status: "OK",
            message: "Se registró la compra exitosamente",
            data: purchases[0]
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

const addPurchase = async (req,res) => {
    try {
        const err = validationResult(req);
        if (!err.isEmpty()) return res.json({
            status: "FAILED",
            message: err.errors[0].msg,
            data: err
        })

        const { fechaCompra, totalPagar, idProveedor } = req.body;

        /* const dateRegister = new Date().getFullYear() + "-" + (new Date().getMonth() + 1)+ "-" + (new Date().getDay() + 1) */

        const purchase = await pool.query(addPurchaseQuery,[fechaCompra, totalPagar, idProveedor]);

        return res.json({
            status: "OK",
            message: "Se registró la compra exitosamente",
            data: purchase[0]
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
    getPurchases,
    addPurchase
};