const express = require("express");
const morgan = require("morgan");

const app = express();

// Configuración de variables

app.set("PORT", process.env.PORT || 3000)

// Configuración de middlewares

app.use(morgan("dev"))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Configurando las rutas

app.use("/api/product", require("./routes/productRoutes"));
app.use("/api/category", require("./routes/categoryRoutes"));

module.exports = app;