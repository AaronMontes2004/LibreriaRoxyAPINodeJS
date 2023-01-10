
const productQueries = {
    getProductsQuery: "SELECT * FROM producto p JOIN categoria c ON p.idCategoria = c.idCategoria JOIN ubicacion u ON p.idUbicacion = u.idUbicacion;",
    addProductQuery: "INSERT INTO producto(nombreProducto, descripcionProducto, stockProducto, precioCProducto, precioVProducto, fechaRegistroProducto, idUbicacion, idCategoria) VALUES (?,?,?,?,?,?,?,?);",
    getProductByIdQuery: "SELECT * FROM producto p JOIN categoria c ON p.idCategoria = c.idCategoria JOIN ubicacion u ON p.idUbicacion = u.idUbicacion WHERE p.idProducto = ?;",
    changeProductStatusQuery: "UPDATE producto SET estadoProducto = ? WHERE idProducto = ?",
    updateProductQuery: "UPDATE producto SET nombreProducto = ?, descripcionProducto = ?, stockProducto = ?, precioCProducto = ?, precioVProducto = ?, idUbicacion = ?, idCategoria = ? WHERE idProducto = ?;"
};

module.exports = productQueries;