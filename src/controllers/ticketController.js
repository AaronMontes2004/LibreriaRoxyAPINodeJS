const { validationResult } = require("express-validator");
const { pool } = require("../database");
const { getTicketQuery, addTicketQuery, getTicketByIdQuery, changeTicketStatusQuery, showTicketQuery } = require("../libs/queries/ticketQueries");


const getTicket = async(req,res) => {
    try {

        const tickets = await pool.query(getTicketQuery);

        return res.json({
            status: "OK",
            message: "Se obtuvieron las boletas exitosamente",
            data: tickets[0]
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            status: "DANGER",
            message: "Error interno del servidor, vuelva a intentarlo mas tarde",
            data: error
        })
    }
}

const addTicket = async (req,res) => {
    try {
        
        const err = validationResult(req);

        if (!err.isEmpty()) return res.json({
            status: "FAILED",
            message: err.errors[0].msg,
            data: err
        })

        const { subtotalBoleta, descuentoBoleta, totalPagarBoleta } = req.body;

        var fecha = new Date(); //Fecha actual
        var mes = fecha.getMonth()+1; //obteniendo mes
        var dia = fecha.getDate(); //obteniendo dia
        var ano = fecha.getFullYear(); //obteniendo año
        if(dia<10)
            dia='0'+dia; //agrega cero si el menor de 10
        if(mes<10)
            mes='0'+mes

        const currentDate = ano + "-" + mes + "-" + dia;

        const addedTicket = await pool.query(addTicketQuery, [currentDate ,subtotalBoleta, descuentoBoleta, totalPagarBoleta])

        return res.json({
            status: "OK",
            message: "Se registró la boleta exitosamente",
            data: addedTicket[0]
        })

    } catch (error) {
        console.log(error);
        res.json({
            status: "DANGER",
            message: "Error interno del servidor, vuelva a intentarlo mas tarde",
            data: error
        })
    }
}

const getTicketById = async (req,res) => {
    try {
        const err = validationResult(req);

        if (!err.isEmpty()) return res.json({
            status: "FAILED",
            message: err.errors[0].msg,
            data: err
        })

        const { idTicket } = req.params;

        const ticketObtained = await pool.query(getTicketByIdQuery, [idTicket])

        return res.json({
            status: "OK",
            message: "Su obtuvo la boleta número "+idTicket,
            data: ticketObtained[0][0]
        })

    } catch (error) {
        console.log(error);
        res.json({
            status: "DANGER",
            message: "Error interno del servidor, vuelva a intentarlo mas tarde",
            data: error
        })
    }
}

const changeTicketStatus = async (req,res) => {
    try {
        
        const err = validationResult(req);

        if (!err.isEmpty()) return res.json({
            status: "FAILED",
            message: err.errors[0].msg,
            data: err
        })

        const { idTicket } = req.params;

        const ticketObtained = await pool.query(getTicketByIdQuery, [idTicket]);

        let status = !ticketObtained[0][0].estadoBoleta;
        let currentDate = null;

        if (status){
            currentDate = new Date().getFullYear() + "-" + (new Date().getMonth() + 1)+ "-" + (new Date().getDate())
        }

        const ticketStatus = await pool.query(changeTicketStatusQuery, [status, currentDate, idTicket])

        return res.json({
            status: "OK",
            message: "Se cambio de estado a la boleta N° "+idTicket,
            data: ticketStatus[0]
        })

    } catch (error) {
        console.log(error);
        res.json({
            status: "DANGER",
            message: "Error interno del servidor, vuelva a intentarlo mas tarde",
            data: error
        })
    }
}

const showTicket = async (req,res) => {
    try {
        
        const err = validationResult(req);

        if (!err.isEmpty()) return res.json({
            status: "FAILED",
            message: err.errors[0].msg,
            data: err
        })

        const { idTicket } = req.params;

        const ticketObtained = await pool.query(showTicketQuery, [idTicket])

        return res.json({
            status: "OK",
            message: "Se obtuvo los datos del ticket",
            data: ticketObtained[0]
        })

    } catch (error) {
        console.log(error);
        res.json({
            status: "DANGER",
            message: "Error interno del servidor, vuelva a intentarlo mas tarde",
            data: error
        })
    }
}

module.exports = {
    getTicket,
    addTicket,
    getTicketById,
    changeTicketStatus,
    showTicket
}