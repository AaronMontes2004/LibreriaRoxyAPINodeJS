const { validationResult } = require("express-validator");
const { pool } = require("../database");
const { getPurchasesDetailQuery, addPurchaseDetailQuery, getPurchaseByIdQuery, updateProductStockQuery, getProductPurchaseByIdQuery } = require("../libs/queries/purchaseDetailQueries");


const getPurchaseDetail = async (req,res) => {
    try {
        const purchasesDetail = await pool.query(getPurchasesDetailQuery);

        return res.json({
            status: "OK",
            message: "Se obtuvieron los detalles de la compra exitosamente",
            data: purchasesDetail[0]
        })
    } catch (error) {
        return res.json({
            status: "OK",
            message: "Producto registrado exitosamente",
            data: error
        });
    }
}

const addPurchaseDetail = async (req,res) => {
    try {
        
        const err = validationResult(req);

        if (!err.isEmpty()) return res.json({
            status: "FAILED",
            message: err.errors[0].msg,
            data: err
        })

        const { cantidadCompra, precioUnitarioCompra, totalCompra, idCompra, idProducto } = req.body;
        
        const purchaseDetailAdded = await pool.query(addPurchaseDetailQuery, [cantidadCompra, precioUnitarioCompra, totalCompra, idCompra, idProducto]);
        
        const productPurchase = await pool.query(getProductPurchaseByIdQuery, [idProducto]);
        /* console.log(productPurchase[0]); */
        const cantidadAdd = parseInt(productPurchase[0][0].stockProducto) + parseInt(cantidadCompra);
        /* console.log("CANTIDAD ACTUALIZADA: "+cantidadAdd); */

        const updatedProduct = await pool.query(updateProductStockQuery, [cantidadAdd, idProducto])
        console.log("PRODUCTO ACTUALIZADO: " + updatedProduct[0]);

        return res.json({
            status: "OK",
            message: "Se registró el detalle de la compra exitosamente",
            data: purchaseDetailAdded[0]
        })

    } catch (error) {
        console.log(error);
        return res.json({
            status: "OK",
            message: "Producto registrado exitosamente",
            data: error
        });
    }
}

const getPurchaseById = async (req,res) => {
    try {
        const err = validationResult(req);

        if (!err.isEmpty()) return res.json({
            status: "FAILED",
            message: err.errors[0].msg,
            data: err
        })

        const { idCompra } = req.params;

        const compraAdded = await pool.query(getPurchaseByIdQuery, [idCompra]);

        return res.json({
            status: "OK",
            message: "La compra fue encontrado",
            data: compraAdded[0]
        })

    } catch (error) {
        return res.json({
            status: "OK",
            message: "Producto registrado exitosamente",
            data: error
        });
    }
}

module.exports = {
    getPurchaseDetail,
    addPurchaseDetail,
    getPurchaseById
}