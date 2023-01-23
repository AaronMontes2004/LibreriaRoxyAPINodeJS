const { validationResult } = require("express-validator");
const { pool } = require("../database");
const { getProductByIdQuery } = require("../libs/queries/productQueries");
const { getSaleDetailQuery, addSaleDetailQuery, getSaleDetailByIdQuery, updateProductStockQuery, updateProductStockMeasureQuery } = require("../libs/queries/saleDetailQueries");

const getSaleDetail = async (req,res) => {
    try {
        const salesDetail = await pool.query(getSaleDetailQuery);
        return res.json({
            status: "OK",
            message: "Los detalles de la venta se obtuvieron exitosamente",
            data: salesDetail[0]
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

const addSaleDetail = async (req,res) => {
    try {
        
        const err = validationResult(req);

        if (!err.isEmpty()) return res.json({
            status: "FAILED",
            message: err.errors[0].msg,
            data: err
        })
        
        const { cantidadVenta, cantidadTipo, precioUnitario, totalVentaIndividual, idProducto, idVenta, idBoleta } = req.body;
        
        const addedSale = await pool.query(addSaleDetailQuery, [cantidadVenta, cantidadTipo, precioUnitario, totalVentaIndividual, idProducto, idBoleta, idVenta])

        if (cantidadTipo === "cm" || cantidadTipo === "m" || cantidadTipo === "CM" || cantidadTipo === "M"){
            const getOneProduct = await pool.query(getProductByIdQuery, [idProducto]);
            const productObtained = getOneProduct[0][0];

            let cantidad = cantidadVenta;
            let cantidadAlmacenado = parseInt(productObtained.cantidadMedida);
            let cantidadMaxima = parseInt(productObtained.cantidadMaxMedida);

            let num = 1;
            let contador = 0;
            let subtractUnit = 0;

            if (cantidadAlmacenado === 0){
                contador = cantidadMaxima;
            } else {
                contador = cantidadAlmacenado;
            }

            while (num <= cantidad) { 
                if (contador === 0){
                    subtractUnit+= 1;
                    contador = cantidadMaxima;
                }
                contador--;
                num++;
            }

            if (contador === 10){
                contador = 0;
            }
            if (cantidadAlmacenado === 0){
                subtractUnit++;
            }

            let stockProductoTotal = parseInt(productObtained.stockProducto) - subtractUnit;

            const updateStockProduct = await pool.query(updateProductStockMeasureQuery, [stockProductoTotal, contador, idProducto]);

            console.log("Las unidades en total son "+ subtractUnit +" unidades con "+contador+" metros. STOCK PRODUCT: ", updateStockProduct[0]);
            
        } else {
            const getOneProduct = await pool.query(getProductByIdQuery, [idProducto]);
            const productObtained = getOneProduct[0][0];

            const newStock = parseInt(productObtained.stockProducto) - parseInt(cantidadVenta);

            const updatedProduct = await pool.query(updateProductStockQuery, [newStock, idProducto])

            console.log(updatedProduct[0]);
        }

        return res.json({
            status: "OK",
            message: "El detalle de la venta se registró exitosamente",
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

const getSaleDetailById = async (req,res) => {
    try {
        const err = validationResult(req);

        if (!err.isEmpty()) return res.json({
            status: "FAILED",
            message: err.errors[0].msg,
            data: err
        })

        const { idVenta } = req.params;

        const salesDetail = await pool.query(getSaleDetailByIdQuery, [idVenta])

        return res.json({
            status: "OK",
            message: "Se obtuvieron los detalles de la venta con Id "+ idVenta,
            data: salesDetail[0]
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
    getSaleDetail,
    addSaleDetail,
    getSaleDetailById
}