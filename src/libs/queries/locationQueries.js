const locationQueries = {
    getLocationsQuery: "SELECT * FROM ubicacion",
    getLocationsEnabledQuery: "SELECT * FROM ubicacion WHERE estadoUbicacion = 1",
    getLocationsDisabledQuery: "SELECT * FROM ubicacion WHERE estadoUbicacion = 0",
    addLocationQuery: "INSERT INTO ubicacion(nombreUbicacion) VALUES (?)",
    getLocationByIdQuery: "SELECT * FROM ubicacion WHERE idUbicacion = ?",
    changeLocationStatusQuery: "UPDATE ubicacion SET estadoUbicacion = ? WHERE idUbicacion = ?",
    updateLocationQuery: "UPDATE ubicacion SET nombreUbicacion = ? WHERE idUbicacion = ?;"
}

module.exports = locationQueries;