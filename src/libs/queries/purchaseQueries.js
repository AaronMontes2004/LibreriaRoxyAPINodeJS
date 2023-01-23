const purchaseQueries = {
    getPurchasesQuery: "SELECT * FROM compra c JOIN proveedor p ON p.idProveedor = c.idProveedor ORDER BY c.idCompra ASC;",
    addPurchaseQuery: "INSERT INTO compra(fechaCompra, totalPagar, idProveedor) VALUES (?,?,?);",
    updatePurchaseQuery: "UPDATE compra SET fechaCompra = ?, totalPagar = ?, idProveedor = ? WHERE idCompra = ?;"
}

module.exports = purchaseQueries;