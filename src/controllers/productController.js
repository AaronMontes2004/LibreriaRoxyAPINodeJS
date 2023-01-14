const { validationResult } = require("express-validator");
const { pool } = require("../database");
const { getProductsQuery, addProductQuery, getProductByIdQuery, changeProductStatusQuery, updateProductQuery, getProductsByNameQuery, getProductsEnabledQuery, getProductsByNameEnabledQuery } = require("../libs/queries/productQueries");


const getProducts = async(req,res) => {
    try {
        const products = await pool.query(getProductsQuery);

        return res.json({
            status: "OK",
            message: "Se obtuvieron los productos exitosamente",
            data: products[0]
        });
    
    } catch (error) {
        console.log(error);
        res.json({
            status: "DANGER",
            message: "Error interno del servidor, vuelva a intentarlo mas tarde",
            data: error
        })
    }
}

const getProductsEnabled = async(req,res) => {
    try {
        const products = await pool.query(getProductsEnabledQuery);

        return res.json({
            status: "OK",
            message: "Se obtuvieron los productos habilitados exitosamente",
            data: products[0]
        });
    
    } catch (error) {
        console.log(error);
        res.json({
            status: "DANGER",
            message: "Error interno del servidor, vuelva a intentarlo mas tarde",
            data: error
        })
    }
}

const addProduct = async(req,res) => {
    try {

        const err = validationResult(req);

        if (!err.isEmpty()) return res.json({
            status: "FAILED",
            message: err.errors[0].msg,
            data: err
        });

        const { nombreProducto, descripcionProducto = "", stockProducto, precioCProducto, precioVProducto, idUbicacion, idCategoria } = req.body;

        const dateRegister = new Date().getFullYear() + "-" + (new Date().getMonth() + 1)+ "-" + (new Date().getDate())
        console.log(dateRegister);

        const aggregateProduct = await pool.query(addProductQuery, [nombreProducto, descripcionProducto, stockProducto, precioCProducto, precioVProducto, dateRegister, idUbicacion, idCategoria]);

        return res.json({
            status: "OK",
            message: "Producto registrado exitosamente",
            data: aggregateProduct
        });
    } catch (error) {
        console.log(error);
        res.json({
            status: "DANGER",
            message: "Error interno del servidor, vuelva a intentarlo mas tarde",
            data: error
        })
    }
}

const getProductById = async(req,res) => {
    try {

        const err = validationResult(req);

        if (!err.isEmpty()) return res.json({
            status: "FAILED",
            message: err.errors[0].msg,
            data: err
        });

        const { idProducto } = req.params;

        const product = await pool.query(getProductByIdQuery, [idProducto]);

        return res.json({
            status: "OK",
            message: "El producto fue encontrado",
            data: product[0][0]
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

const changeProductStatus = async (req,res) => {
    try {
        const err = validationResult(req);

        if (!err.isEmpty()) return res.json({
            status: "FAILED",
            message: err.errors[0].msg,
            data: err
        })

        const { idProducto } = req.params;

        const product = await pool.query(getProductByIdQuery, [idProducto]);

        const changeStatus = await pool.query(changeProductStatusQuery, [!product[0][0].estadoProducto,product[0][0].idProducto])

        return res.json({
            status: "OK",
            message: "El estado fue cambiado exitosamente",
            data: changeStatus[0]
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

const updateProduct = async (req,res) => {
    try {
        const err = validationResult(req);

        if (!err.isEmpty()){
            console.log(err);
            return res.json({
                status: "FAILED",
                message: err.errors[0].msg,
                data: err
            })
        }

        const {idProducto} = req.params;
        const {nombreProducto, descripcionProducto, stockProducto, precioCProducto, precioVProducto, idUbicacion, idCategoria} = req.body; 

        const updatedProduct = await pool.query(updateProductQuery, [nombreProducto, descripcionProducto, stockProducto, precioCProducto, precioVProducto, idUbicacion, idCategoria, idProducto]);

        res.json({
            status: "OK",
            message: "El producto fue actualizado exitosamente",
            data: updatedProduct[0]
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

const getProductByName = async(req,res) => {
    try {
        const { nombreProducto } = req.params;
        const products = await pool.query(getProductsByNameQuery, [nombreProducto]);

        return res.json({
            status: "OK",
            message: "Los productos se obtuvieron exitosamente",
            data: products[0]
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

const getProductByNameEnabled = async(req,res) => {
    try {
        const { nombreProducto } = req.params;
        const products = await pool.query(getProductsByNameEnabledQuery, [nombreProducto]);

        return res.json({
            status: "OK",
            message: "Los productos habilitados se obtuvieron exitosamente",
            data: products[0]
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
    getProducts,
    getProductsEnabled,
    addProduct,
    getProductById,
    changeProductStatus,
    updateProduct,
    getProductByName,
    getProductByNameEnabled
}