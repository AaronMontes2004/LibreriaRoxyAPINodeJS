const saleQueries = {
    getSalesQuery: "SELECT * FROM venta",
    addSaleQuery: "INSERT INTO venta(fechaVenta, totalVenta) VALUES (?,?);"
}

module.exports = saleQueries;