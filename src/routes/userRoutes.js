const { Router } = require("express");
const { loginUsuario, signinUsuario, verifyToken } = require("../controllers/userController");
const { signinValidation, loginValidation } = require("../middlewares/routeValidation/userValidation");

const usuarioRoutes = Router();

usuarioRoutes.post("/login", loginValidation, loginUsuario);

usuarioRoutes.post("/signin", signinValidation, signinUsuario)

usuarioRoutes.post("/verifyToken", verifyToken)

module.exports = usuarioRoutes;