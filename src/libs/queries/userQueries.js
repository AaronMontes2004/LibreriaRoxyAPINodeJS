const usersQueries = {
    loginUsuarioQuery: "SELECT * FROM usuario WHERE usuarioUsuario = ?",
    signinUsuarioQuery: "INSERT INTO usuario(nombreUsuario, apellidoUsuario, usuarioUsuario, emailUsuario, contrasenaUsuario, idRol) VALUES (?,?,?,?,?,?)"
}

module.exports = usersQueries;