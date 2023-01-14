const purchaseQueries = {
    getPurchasesQuery: "SELECT * FROM compra c JOIN proveedor p ON p.idProveedor = c.idProveedor;",
    addPurchaseQuery: "INSERT INTO compra(fechaCompra, totalPagar, idProveedor) VALUES (?,?,?);"
}

module.exports = purchaseQueries;