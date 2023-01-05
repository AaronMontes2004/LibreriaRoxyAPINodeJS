const { body } = require("express-validator");
const { pool } = require("../../database");

const userValidation = {
    loginValidation: [
        body("usuarioUsuario").notEmpty().withMessage("El usuario no puede estar vacio").custom(async(value) => {
            const user = await pool.query("SELECT * FROM usuario WHERE usuarioUsuario = ?", [value]);
            if (user[0].length !== 0) return true;
            throw new Error("El usuario ingresado no existe");
        }),
        body("contrasenaUsuario").notEmpty().withMessage("La contraseña no puede estar vacio")
    ],
    signinValidation: [
        body("nombreUsuario").notEmpty().withMessage("El nombre no puede estar vacio").isString().withMessage("El nombre debe ser un texto"),
        body("apellidoUsuario").notEmpty().withMessage("El apellido no puede estar vacio").isString().withMessage("El apellido debe ser un texto"),
        body("usuarioUsuario").notEmpty().withMessage("El usuario no puede estar vacio").isString().withMessage("El usuario debe tener al menos una letra").isLength({min: 4}).withMessage("El usuario debe tener por los menos 4 caracteres").custom( async (value) => {
            const user = await pool.query("SELECT * FROM usuario WHERE usuarioUsuario = ?", [value])
            if (user[0].length === 0) return true;
            throw new Error("El usuario ya existe");
        }),
        body("emailUsuario").notEmpty().withMessage("El correo electrónico no puede estar vacio").isEmail().withMessage("El correo electrónico no tiene el formato adecuado").custom( async(value) => {
            const user = await pool.query("SELECT * FROM usuario WHERE emailUsuario = ?", [value]);
            if (user[0].length === 0) return true;
            throw new Error("El correo electrónico ya está en uso");
        }),
        body("contrasenaUsuario").notEmpty().withMessage("La contraseña no puede estar vacio").isString().withMessage("La contraseña debe tener al menos una letra").isLength({min: 6}).withMessage("La contraseña debe tener al menos 6 caracteres"),
        body("idRol").notEmpty().withMessage("Debes ingresar un rol para el usuario").custom(async (value) => {
            const rol = await pool.query("SELECT * FROM rol WHERE idRol = ?", [value]);
            if (rol[0].length !== 0) return true;
            throw new Error("EL rol no existe");
        })
    ]
};

module.exports = userValidation;