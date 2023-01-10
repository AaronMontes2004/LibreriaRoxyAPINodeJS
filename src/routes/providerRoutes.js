const { Router } = require("express");
const { getProviders, addProvider, changeProviderStatus, getProviderById, updateProvider } = require("../controllers/providerController");
const { addProvidersValidation, changeProviderStatusValidation, getProviderByIdValidation, updateProviderValidation } = require("../middlewares/routeValidation/providerValidation");

const providerRoutes = Router();

providerRoutes.get("/", getProviders);

providerRoutes.get("/findById/:idProveedor", getProviderByIdValidation, getProviderById)

providerRoutes.post("/", addProvidersValidation, addProvider)

providerRoutes.put("/changeStatus/:idProveedor", changeProviderStatusValidation, changeProviderStatus);

providerRoutes.put("/:idProveedor", updateProviderValidation, updateProvider)

module.exports = providerRoutes;