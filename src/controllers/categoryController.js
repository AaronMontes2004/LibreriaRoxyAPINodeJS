const { pool } = require("../database");
const categoriesQueries = require("../libs/queries/categoryQueries");
const { validationResult } =require("express-validator");
const { getCategoryByIdQuery, changeCategoryStatusQuery, getCategoriesDisabledQuery, getCategoriesEnabledQuery, updateCategoryQuery } = require("../libs/queries/categoryQueries");

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
        res.json({
            status: "DANGER",
            message: "Error interno del servidor, vuelva a intentarlo mas tarde",
            data: error
        })
    }
}

const getCategoriesEnabled = async(req,res) => {

    try {
        const categories = await pool.query(getCategoriesEnabledQuery);

        console.log(categories[0]);

        res.status(200).json({
            status: "OK",
            message: "Se obtuvieron las categorias exitosamente",
            data: categories[0]
        });
    } catch (error) {
        console.log(error);
        res.json({
            status: "DANGER",
            message: "Error interno del servidor, vuelva a intentarlo mas tarde",
            data: error
        })
    }
}

const addCategory = async (req,res) => {

    try {
        const err = validationResult(req);

        if (!err.isEmpty()) return res.json({
            status: "FAILED",
            message: err.errors[0].msg
        })

        const aggregateCategory = await pool.query(categoriesQueries.addCategoryQuery,
        [req.body.nombreCategoria.toLowerCase()]);

        console.log(aggregateCategory);
        res.json({
            status: "OK",
            message: "La categoria fue registrado exitosamente",
            data: aggregateCategory[0]
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

const getCategoryById = async(req,res) => {
    try {

        const err = validationResult(req);

        if (!err.isEmpty()) return res.json({
            status: "FAILED",
            message: err.errors[0].msg,
            data: err
        })

        const { idCategoria } = req.params;

        const category = await pool.query(getCategoryByIdQuery, [idCategoria]);

        return res.json({
            status: "OK",
            message: "La categoria fue encontrada",
            data: category[0][0]
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: "DANGER",
            message: "Error interno del servidor, vuelva a intentarlo mas tarde",
            data: error
        })
    }
}

const changeCategoryStatus = async(req,res) => {
    try {

        const err = validationResult(req);

        if (!err.isEmpty()) return res.json({
            status: "FAILED",
            message: err.errors[0].msg,
            data: err
        })

        const { idCategoria } = req.params;

        const category = await pool.query(getCategoryByIdQuery, [idCategoria]);

        console.log(category[0]);

        const changeStatus = await pool.query(changeCategoryStatusQuery, [!category[0][0].estadoCategoria,category[0][0].idCategoria])

        return res.json({
            status: "OK",
            message: "El estado fue cambiado exitosamente",
            data: changeStatus[0]
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: "DANGER",
            message: "Error interno del servidor, vuelva a intentarlo mas tarde",
            data: error
        })
    }
}

const updateCategory = async(req,res) => {
    try {

        const err = validationResult(req);

        if (!err.isEmpty()) return res.json({
            status: "FAILED",
            message: err.errors[0].msg,
            data: err
        })

        const {nombreCategoria} = req.body;
        const {idCategoria} = req.params;

        const updatedCategory = await pool.query(updateCategoryQuery, [nombreCategoria, idCategoria])

        res.json({
            status: "OK",
            message: "La categoria fue actualizada exitosamente",
            data: updatedCategory[0]
        })
        
    } catch (error) {
        console.log(error);
        return res.json({
            status: "DANGER",
            message: "Error interno del servidor, vuelva a intentarlo mas tarde",
            data: error
        })
    }
}

module.exports = {
    getCategories,
    getCategoriesEnabled,
    addCategory,
    getCategoryById,
    changeCategoryStatus,
    updateCategory
}