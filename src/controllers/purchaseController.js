const { pool } = require("../database");
const { getPurchasesQuery } = require("../libs/queries/purchaseQueries");

const getPurchases = async (req,res) => {
    try {
        const purchases = await pool.query(getPurchasesQuery);

        return res.json({
            status: "OK",
            message: "Se obtuvieron las compras exitosamente",
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

}

module.exports = {
    getPurchases,
    addPurchase
};