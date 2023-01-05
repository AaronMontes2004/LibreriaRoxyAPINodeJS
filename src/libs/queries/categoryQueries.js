const categoriesQueries = {
    getCategoriesQuery: "SELECT * FROM categoria",
    addCategoryQuery: "INSERT INTO categoria(nombreCategoria) VALUES (?);"
};

module.exports = categoriesQueries;