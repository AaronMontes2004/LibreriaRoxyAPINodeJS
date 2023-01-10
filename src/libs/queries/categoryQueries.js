const categoryQueries = {
    getCategoriesQuery: "SELECT * FROM categoria;",
    getCategoriesEnabledQuery: "SELECT * FROM categoria WHERE estadoCategoria = 1",
    getCategoriesDisabledQuery: "SELECT * FROM categoria WHERE estadoCategoria = 0",
    addCategoryQuery: "INSERT INTO categoria(nombreCategoria) VALUES (?);",
    getCategoryByIdQuery: "SELECT * FROM categoria WHERE idCategoria = ?;",
    changeCategoryStatusQuery: "UPDATE categoria SET estadoCategoria = ? WHERE idCategoria = ? ;",
    updateCategoryQuery: "UPDATE categoria SET nombreCategoria = ? WHERE idCategoria = ?"
};

module.exports = categoryQueries;