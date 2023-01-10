const providerQueries = {
    getProvidersQuery: "SELECT * FROM proveedor",
    addProviderQuery: "INSERT INTO proveedor(nombreProveedor, telefonoProveedor, direccionProveedor, emailProveedor) VALUES (?,?,?,?);",
    getProviderByIdQuery: "SELECT * FROM proveedor WHERE idProveedor = ?;",
    changeProviderStatusQuery: "UPDATE proveedor SET estadoProveedor = ? WHERE idProveedor = ?;",
    updateProviderQuery: "UPDATE proveedor SET nombreProveedor = ?, telefonoProveedor = ?, direccionProveedor = ?, emailProveedor = ? WHERE idProveedor = ?;"
}

module.exports = providerQueries;