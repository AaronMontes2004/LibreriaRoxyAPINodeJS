const { validationResult } = require("express-validator");
const { pool } = require("../database");
const { getProvidersQuery, addProviderQuery, getProviderByIdQuery, changeProviderStatusQuery, updateProviderQuery, getProvidersEnabledQuery } = require("../libs/queries/providerQueries");

const getProviders = async (req,res) => {
    try {

        const providers = await pool.query(getProvidersQuery);

        res.json({
            status: "OK",
            message: "Se obtuvieron los proveedores exitosamente",
            data: providers[0]
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

const getProvidersEnabled = async (req,res) => {
    try {

        const providers = await pool.query(getProvidersEnabledQuery);

        res.json({
            status: "OK",
            message: "Se obtuvieron los proveedores habilitados exitosamente",
            data: providers[0]
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


const getProviderById = async (req,res) => {
    try {
        const err = validationResult(req);

        if (!err.isEmpty()) return res.json({
            status: "FAILED",
            message: err.errors[0].msg,
            data: err
        })

        const {idProveedor} = req.params;

        const provider = await pool.query(getProviderByIdQuery, [idProveedor]);

        res.json({
            status: "OK",
            message: "El proveedor fue encontrado exitosamente",
            data: provider[0][0]
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

const addProvider = async (req,res) => {
    try {

        const err = validationResult(req);

        if (!err.isEmpty()) return res.json({
            status: "FAILED",
            message: err.errors[0].msg,
            data: err
        })

        const {nombreProveedor, telefonoProveedor, direccionProveedor = "", emailProveedor = ""} = req.body;

        const providerAggregate = await pool.query(addProviderQuery, [nombreProveedor, telefonoProveedor, direccionProveedor, emailProveedor]);

        res.json({
            status: "OK",
            message: "Se registró el proveedor exitosamente",
            data: providerAggregate[0]
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

const changeProviderStatus = async(req,res) => {
    try {
        const err = validationResult(req);

        if (!err.isEmpty()) return res.json({
            status: "FAILED",
            message: err.errors[0].msg,
            data: err
        })

        const { idProveedor } = req.params;

        const provider = await pool.query(getProviderByIdQuery, [idProveedor])

        console.log(provider[0]);

        const changeStatus = await pool.query(changeProviderStatusQuery, [!provider[0][0].estadoProveedor, provider[0][0].idProveedor])

        res.json({
            status: "OK",
            message: "El estado del proveedor fue cambiado exitosamente",
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

const updateProvider = async (req,res) => {
    try {
        const err = validationResult(req);

        if (!err.isEmpty()) return res.json({
            status: "FAILED",
            message: err.errors[0].msg,
            data: err
        })

        const {nombreProveedor, telefonoProveedor, direccionProveedor, emailProveedor} = req.body;
        const {idProveedor} = req.params;

        const updatedProvider = await pool.query(updateProviderQuery,[nombreProveedor, telefonoProveedor, direccionProveedor, emailProveedor, idProveedor])

        return res.json({
            status: "OK",
            message: "El proveedor fue actualizado exitosamente",
            data: updatedProvider[0]
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
    getProviders,
    getProvidersEnabled,
    addProvider,
    changeProviderStatus,
    getProviderById,
    updateProvider
}