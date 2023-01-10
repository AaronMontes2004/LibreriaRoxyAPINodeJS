const { body, param } = require("express-validator");
const { pool } = require("../../database");

const locationValidation = {
    getLocationByIdValidation: [
        param("idUbicacion").notEmpty().withMessage("El id de la ubicacion no puede estar vacia").custom(async(value) => {
            const location = await pool.query("SELECT * FROM ubicacion WHERE idUbicacion = ?", [value]);
            if (location[0].length === 0) throw new Error("La ubicacion no existe");
            return true;
        })
    ],
    addLocationValidation: [
        body("nombreUbicacion").notEmpty().withMessage("El nombre de la ubicación no puede estar vacio").isString().withMessage("El nombre de la ubicación debe ser un texto").custom(async(value) => {
            const locations = await pool.query("SELECT * FROM ubicacion WHERE nombreUbicacion = ?;",[value]);

            if(locations[0].length === 0) return true;

            throw new Error("La ubicación ya existe");
        })
    ],
    changeLocationStatusValidation: [
        param("idUbicacion").notEmpty().withMessage("El id de la ubicacion no puede estar vacia").custom(async(value) => {
            const location = await pool.query("SELECT * FROM ubicacion WHERE idUbicacion = ?", [value]);
            if (location[0].length === 0) throw new Error("La ubicacion no existe");
            return true;
        }),
    ],

    updateLocationValidation: [
        param("idUbicacion").notEmpty().withMessage("EL id de la ubicación no puede estar vacio").custom(async(value) => {
            const location = await pool.query("SELECT * FROM ubicacion WHERE idUbicacion = ?", [value]);
            if (location[0].length !== 0) return true;
            throw new Error("No hay ubicación con ese id");
        }),
        body("nombreUbicacion").notEmpty().withMessage("El nombre de la ubicación no puede estar vacio").isString().withMessage("El nombre de la ubicación debe ser un texto").custom(async(value, {req}) => {
            const location = await pool.query("SELECT * FROM ubicacion WHERE idUbicacion = ?", [req.params.idUbicacion]);

            if (location[0][0].nombreUbicacion.toLowerCase() === value.toLowerCase()) return true;

            const locations = await pool.query("SELECT * FROM ubicacion WHERE nombreUbicacion = ?;",[value]);

            if(locations[0].length === 0) return true;

            throw new Error("La ubicación ya existe");
        })
    ]
}

module.exports = locationValidation;