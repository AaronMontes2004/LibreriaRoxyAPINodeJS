const purchaseDetailQueries = {
    getPurchasesDetailQuery: "SELECT * FROM detalle_compra dc JOIN producto p ON dc.idProducto = p.idProducto JOIN compra c ON dc.idCompra = c.idCompra JOIN proveedor pro ON c.idProveedor = pro.idProveedor",
    addPurchaseDetailQuery: "INSERT INTO detalle_compra(cantidadCompra, precioUnitarioCompra, totalCompra, idCompra, idProducto) VALUES (?,?,?,?,?)",
    getPurchaseByIdQuery: "SELECT * FROM detalle_compra dc JOIN producto p ON dc.idProducto = p.idProducto JOIN compra c ON dc.idCompra = c.idCompra JOIN proveedor pro ON c.idProveedor = pro.idProveedor WHERE c.idCompra = ?;",
    updateProductStockQuery: "UPDATE producto SET stockProducto = ? WHERE idProducto = ?;",
    getProductPurchaseByIdQuery: "SELECT * FROM producto  WHERE idProducto = ?;"
}

module.exports = purchaseDetailQueries;