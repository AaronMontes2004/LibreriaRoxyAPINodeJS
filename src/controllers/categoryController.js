const { pool } = require("../database");
const categoriesQueries = require("../libs/queries/categoryQueries");
const { validationResult } =require("express-validator");

const getCategories = async(req,res) => {

    try {
        const categories = await pool.query(categoriesQueries.getCategoriesQuery);

        res.status(200).json({
            status: "OK",
            message: "Se obtuvieron las categorias exitosamente",
            data: categories[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "DANGER",
            message: "Error interno del servidor, vuelva a intentarlo mas tarde",
            data: error
        })
    }
}

const addCategory = async (req,res) => {

    try {
        const err = validationResult(req);

        if (!err.isEmpty()) return res.status(400).json({
            status: "FAILED",
            message: err.errors[0].msg
        })

        const aggregateCategory = await pool.query(categoriesQueries.addCategoryQuery,
        [req.body.nombreCategoria.toLowerCase()]);

        console.log(aggregateCategory);
        res.status(500).json({
            status: "OK",
            message: "El producto fue registrado exitosamente",
            data: aggregateCategory
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
    getCategories,
    addCategory
}