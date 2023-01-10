const { validationResult } = require("express-validator");
const { pool } = require("../database");
const { getLocationsQuery, addLocationQuery, getLocationByIdQuery, changeLocationStatusQuery, getLocationsEnabledQuery, updateLocationQuery } = require("../libs/queries/locationQueries");


const getLocations = async (req,res) => {

    try {
        const locations = await pool.query(getLocationsQuery);
        res.json({
            status: "OK", 
            message: "Lo productos se obtuvieron exitosamente",
            data: locations[0]
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

const getLocationsEnabled = async (req,res) => {
    try {
        const locations = await pool.query(getLocationsEnabledQuery);

        res.json({
            status: "OK", 
            message: "Lo productos se obtuvieron exitosamente",
            data: locations[0]
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

const getLocationById = async(req,res) => {
    try {

        const err = validationResult(req);

        if (!err.isEmpty()) return res.json({
            status: "FAILED",
            message: err.errors[0].msg,
            data: err
        })

        const { idUbicacion } = req.params;

        const location = await pool.query(getLocationByIdQuery, [idUbicacion]);

        res.json({
            status: "OK",
            message: "La ubicación fue encontrado exitosamente",
            data: location[0][0]
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

const addLocation = async (req,res) => {
    try {

        const err = validationResult(req);

        if (!err.isEmpty()) return res.json({
            status: "FAILED",
            message: err.errors[0].msg,
            data: err
        })

        const { nombreUbicacion } = req.body;
        
        const location = await pool.query(addLocationQuery,[nombreUbicacion.toUpperCase()]);

        res.json({
            status: "OK",
            message: "La ubicación se registró exitosamente",
            data: location[0]
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

const changeLocationStatus = async(req,res) => {
    try {
        const err = validationResult(req);

        if (!err.isEmpty()) return res.json({
            status: "FAILED",
            message: err.errors[0].msg,
            data: err
        })

        const { idUbicacion } = req.params;

        const location = await pool.query(getLocationByIdQuery, [idUbicacion]);
        const changeStatus = await pool.query(changeLocationStatusQuery, [!location[0][0].estadoUbicacion, location[0][0].idUbicacion]);

        res.json({
            status: "OK",
            message: "El estado de la ubicación se cambió exitosamente",
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

const updateLocation = async (req,res) => {
    try {

        const err = validationResult(req);

        if (!err.isEmpty()) return res.json({
            status: "FAILED",
            message: err.errors[0].msg,
            data: err
        })

        const {nombreUbicacion} = req.body;
        const {idUbicacion} = req.params;

        const updateUbicacion = await pool.query(updateLocationQuery, [nombreUbicacion.toUpperCase(), idUbicacion]);

        res.json({
            status: "OK",
            message: "La ubicación fue actualizada exitosamente",
            data: updateUbicacion[0]
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
    getLocations,
    getLocationsEnabled,
    addLocation,
    changeLocationStatus,
    updateLocation,
    getLocationById
}