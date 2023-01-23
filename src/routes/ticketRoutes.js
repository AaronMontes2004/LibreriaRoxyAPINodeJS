const { Router } = require("express");
const { getTicket, addTicket, getTicketById, changeTicketStatus, showTicket } = require("../controllers/ticketController");
const { addTicketValidation, getTicketByIdValidation, changeTicketStatusValidation, showTicketValidation } = require("../middlewares/routeValidation/ticketValidation");

const ticketRoutes = Router();

ticketRoutes.get("/", getTicket);

ticketRoutes.post("/", addTicketValidation, addTicket);

ticketRoutes.get("/:idTicket", getTicketByIdValidation, getTicketById);

ticketRoutes.put("/changeStatus/:idTicket", changeTicketStatusValidation, changeTicketStatus);

ticketRoutes.get("/show/:idTicket", showTicketValidation, showTicket)

module.exports = ticketRoutes;