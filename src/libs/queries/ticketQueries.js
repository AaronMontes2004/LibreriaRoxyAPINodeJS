const ticketQueries = {
    getTicketQuery: "SELECT * FROM boleta ORDER BY idBoleta ASC",
    getTicketByIdQuery: "SELECT * FROM boleta WHERE idBoleta = ?",
    addTicketQuery: "INSERT INTO boleta(fechaRegistroBoleta, subtotalBoleta, descuentoBoleta, totalPagarBoleta) VALUES (?,?,?,?)",
    changeTicketStatusQuery: "UPDATE boleta SET estadoBoleta = ?, fechaEmsiónBoleta = ? WHERE idBoleta = ?",
    showTicketQuery: "SELECT * FROM boleta b JOIN detalle_venta dv ON b.idBoleta = dv.idBoleta JOIN producto p ON p.idProducto = dv.idProducto WHERE b.idBoleta = ?"
}

module.exports = ticketQueries;