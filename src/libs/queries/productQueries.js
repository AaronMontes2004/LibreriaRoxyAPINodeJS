
const productQueries = {
    getProductsQuery: "SELECT * FROM producto p JOIN categoria c ON p.idCategoria = c.idCategoria JOIN ubicacion u ON p.idUbicacion = u.idUbicacion;",
    getProductsEnabledQuery: "SELECT * FROM producto p JOIN categoria c ON p.idCategoria = c.idCategoria JOIN ubicacion u ON p.idUbicacion = u.idUbicacion WHERE estadoProducto = 1;",
    addProductQuery: "INSERT INTO producto(nombreProducto, descripcionProducto, stockProducto, precioCProducto, precioVProducto, fechaRegistroProducto, idUbicacion, idCategoria) VALUES (?,?,?,?,?,?,?,?);",
    addProductMeasureQuery: "INSERT INTO producto(nombreProducto, descripcionProducto, stockProducto, precioCProducto, precioVProducto, fechaRegistroProducto, idUbicacion, idCategoria, medidaHabilitada, tipoMedida, cantidadMaxMedida, cantidadMedida, precioMedida) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);",
    getProductByIdQuery: "SELECT * FROM producto p JOIN categoria c ON p.idCategoria = c.idCategoria JOIN ubicacion u ON p.idUbicacion = u.idUbicacion WHERE p.idProducto = ?;",
    changeProductStatusQuery: "UPDATE producto SET estadoProducto = ? WHERE idProducto = ?",
    updateProductQuery: "UPDATE producto SET nombreProducto = ?, descripcionProducto = ?, stockProducto = ?, precioCProducto = ?, precioVProducto = ?, idUbicacion = ?, idCategoria = ? WHERE idProducto = ?;",
    getProductsByNameQuery: "SELECT * FROM producto WHERE nombreProducto LIKE CONCAT('%',?,'%');",
    getProductsByNameEnabledQuery: "SELECT * FROM producto WHERE nombreProducto LIKE CONCAT('%',?,'%') AND estadoProducto = 1;"
};

module.exports = productQueries;