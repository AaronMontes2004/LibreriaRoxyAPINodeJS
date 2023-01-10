const { body, param } = require("express-validator");
const { default: isEmail } = require("validator/lib/isemail");
const { pool } = require("../../database");


const providerValidation = {
    addProvidersValidation: [
        body("nombreProveedor").notEmpty().withMessage("El nombre del proveedor no puede estar vacio").custom(async(value) => {
            const provider = await pool.query("SELECT * FROM proveedor WHERE nombreProveedor = ?;", [value])

            if (provider[0].length === 0) return true;

            throw new Error("El nombre del proveedor ya existe");
        }),
        body("telefonoProveedor").notEmpty().withMessage("El telefono del proveedor no puede estar vacio").isNumeric().withMessage("El telefono el proveedor debe tener solo números").isLength({min: 8}).withMessage("El telefono del proveedor debe tener al menos 8 caracteres").custom(async(value)=> {
            const provider = await pool.query("SELECT * FROM proveedor WHERE telefonoProveedor = ?;",[value]);

            if (provider[0].length === 0) return true;

            throw new Error("El telefono del proveedor ya existe");
        }),
        /* body("direccionProveedor"), */
        body("emailProveedor").custom((value) => {
            if (value.length === 0 || value === undefined || value === null || value === "") return true;
            if (!isEmail(value)) throw new Error("El correo electrónico no tiene el formato adecuado");
            return true;
        })
    ],
    getProviderByIdValidation: [
        param("idProveedor").notEmpty().withMessage("EL id del proveedor no puede estar vacio").custom(async(value) => {
            const provider = await pool.query("SELECT * FROM proveedor WHERE idProveedor = ?", [value]);
            if (provider[0].length !== 0) return true;
            throw new Error("No hay proveedor con ese id");
        })
    ],

    changeProviderStatusValidation: [
        param("idProveedor").notEmpty().withMessage("EL id del proveedor no puede estar vacio").custom(async(value) => {
            const provider = await pool.query("SELECT * FROM proveedor WHERE idProveedor = ?", [value]);
            if (provider[0].length !== 0) return true;
            throw new Error("No hay proveedor con ese id");
        })
    ],

    updateProviderValidation: [
        param("idProveedor").notEmpty().withMessage("EL id del proveedor no puede estar vacio").custom(async(value) => {
            const provider = await pool.query("SELECT * FROM proveedor WHERE idProveedor = ?", [value]);
            if (provider[0].length !== 0) return true;
            throw new Error("No hay proveedor con ese id");
        }),
        body("nombreProveedor").notEmpty().withMessage("El nombre del proveedor no puede estar vacio").custom(async(value, {req}) => {
            const providerId = await pool.query("SELECT * FROM proveedor WHERE idProveedor = ?", [req.params.idProveedor])

            if (providerId[0][0].nombreProveedor.toLowerCase() === value.toLowerCase()) return true;

            const provider = await pool.query("SELECT * FROM proveedor WHERE nombreProveedor = ?;", [value])
            if (provider[0].length === 0) return true;
            throw new Error("El nombre del proveedor ya existe");
        }),
        body("telefonoProveedor").notEmpty().withMessage("El telefono del proveedor no puede estar vacio").isNumeric().withMessage("El telefono el proveedor debe tener solo números").isLength({min: 8}).withMessage("El telefono del proveedor debe tener al menos 8 caracteres").custom(async(value, {req})=> {
            const providerId = await pool.query("SELECT * FROM proveedor WHERE idProveedor = ?", [req.params.idProveedor]);
            
            if (providerId[0][0].telefonoProveedor === value) return true;

            const provider = await pool.query("SELECT * FROM proveedor WHERE telefonoProveedor = ?;",[value]);
            if (provider[0].length === 0) return true;
            throw new Error("El telefono del proveedor ya existe");
        }),
        /* body("direccionProveedor"), */
        body("emailProveedor").custom(async(value, {req}) => {
            if (value.length === 0 || value === undefined || value === null || value === "") return true;
            if (!isEmail(value)) throw new Error("El correo electrónico no tiene el formato adecuado");
            const providerId = await pool.query("SELECT * FROM proveedor WHERE idProveedor = ?", [req.params.idProveedor])
            if (providerId[0][0].emailProveedor.toLowerCase() === value.toLowerCase()) return true;
            return true;
        })
    ]
}

module.exports = providerValidation;