const saleDetailQueries = {
    getSaleDetailQuery: "SELECT * FROM detalle_venta dv JOIN venta v ON dv.idVenta = v.idVenta JOIN producto p ON dv.idProducto = p.idProducto JOIN boleta b ON dv.idBoleta = b.idBoleta;",
    addSaleDetailQuery: "INSERT INTO detalle_venta(cantidadVenta, cantidadTipo, precioUnitario, totalVentaIndividual, idProducto, idBoleta, idVenta) VALUES (?,?,?,?,?,?,?); ",
    getSaleDetailByIdQuery: "SELECT * FROM detalle_venta dv JOIN venta v ON dv.idVenta = v.idVenta JOIN producto p ON dv.idProducto = p.idProducto JOIN boleta b ON dv.idBoleta = b.idBoleta WHERE dv.idVenta = ?;",
    updateProductStockQuery: "UPDATE producto SET stockProducto = ? WHERE idProducto = ?",
    updateProductStockMeasureQuery: "UPDATE producto SET stockProducto = ?, cantidadMedida = ? WHERE idProducto = ?"
}

module.exports = saleDetailQueries;