const { Router } = require("express");
const { loginUsuario, signinUsuario } = require("../controllers/userController");
const { signinValidation, loginValidation } = require("../middlewares/routeValidation/userValidation");

const usuarioRoutes = Router();

usuarioRoutes.post("/login", loginValidation, loginUsuario);

usuarioRoutes.post("/signin", signinValidation, signinUsuario)

module.exports = usuarioRoutes;