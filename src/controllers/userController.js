const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { pool } = require("../database");
const { loginUsuarioQuery, signinUsuarioQuery } = require("../libs/queries/userQueries");
const jwt = require("jsonwebtoken");

const loginUsuario = async (req,res) => {

    try {
        const err = validationResult(req);

        if (!err.isEmpty()) return res.json({
            status: "FAILED",
            message: err.errors[0].msg
        })

        const { usuarioUsuario, contrasenaUsuario } = req.body;

        const user = await pool.query(loginUsuarioQuery, [usuarioUsuario]);

        const verified = await bcrypt.compare( contrasenaUsuario, user[0][0].contrasenaUsuario);
        console.log(verified);

        if(!verified) return res.json({
            status: "FAILED",
            message: "La contraseña es incorrecta"
        });

        const token = jwt.sign({id: user[0][0].idUsuario}, process.env.JWT_KEY, {expiresIn: "168h"})

        let userObtained = user[0][0];

        userObtained.token = token;

        res.json({
            status: "OK",
            message: "Ingresó al sistema exitosamente",
            data: userObtained
        });
    } catch (error) {
        console.log(error);
        res.json({
            status: "DANGER",
            message: "Error interno en el servidor, vuelva a intentarlo mas tarde",
            data: error
        });
    }
}

const signinUsuario = async (req,res) => {

    try {

        const err = validationResult(req);

        if(!err.isEmpty()) return res.json({
            status: "FAILED",
            message: err.errors[0].msg,
            data: err
        })

        const { nombreUsuario, apellidoUsuario, usuarioUsuario, emailUsuario, contrasenaUsuario, idRol } = req.body;

        const contrasenaUsuarioHash = await bcrypt.hash(contrasenaUsuario, 8);

        const registeredUser = await pool.query(signinUsuarioQuery, [nombreUsuario, apellidoUsuario, usuarioUsuario, emailUsuario, contrasenaUsuarioHash, idRol]);

        console.log(registeredUser);

        res.status(200).json({
            status: "OK",
            message: "El usuario fue registrado exitosamente",
            data: registeredUser
        });
        
    } catch (error) {
        console.log(error);
        res.json({
            status: "DANGER",
            message: "Error interno en el servidor, vuelva a intentarlo mas tarde",
            data: error
        })
    }
}

const verifyToken = async(req,res) =>{
    try {
        const { token } = req.body;

        if (!token){
            return res.json({
                status: "FAILED",
                message: "El token no puede estar vacio"
            })
        }

        const user = jwt.verify(token, process.env.JWT_KEY);

        return res.json({
            status: "OK",
            message: "EL token es válido",
            data: user
        })
    } catch (error) {
        console.log(error);
        if (error?.name === "TokenExpiredError"){
            return res.json({
                status: "FAILED",
                message: "El token ha expirado"
            })
        }

        if (error?.name === "JsonWebTokenError"){
            return res.json({
                status: "FAILED",
                message: "El token es inválido"
            })
        }

        return res.json({
            status: "DANGER",
            message: "Error interno en el servidor, vuelva a intentarlo mas tarde",
            data: error
        })
    }
}

module.exports = {
    loginUsuario, signinUsuario, verifyToken
}