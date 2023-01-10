const { Router } = require("express");
const { getLocations, addLocation, changeLocationStatus, getLocationsEnabled, updateLocation, getLocationById } = require("../controllers/locationController");
const { addLocationValidation, changeLocationStatusValidation, updateLocationValidation, getLocationByIdValidation } = require("../middlewares/routeValidation/locationValidation");

const locationRoutes = Router();

locationRoutes.get("/", getLocations)

locationRoutes.get("/findById/:idUbicacion", getLocationByIdValidation, getLocationById)

locationRoutes.get("/enabled", getLocationsEnabled)

locationRoutes.post("/", addLocationValidation, addLocation)

locationRoutes.put("/changeStatus/:idUbicacion", changeLocationStatusValidation, changeLocationStatus)

locationRoutes.put("/:idUbicacion", updateLocationValidation, updateLocation)

module.exports = locationRoutes;