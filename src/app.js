const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// Configuración de variables

app.set("PORT", process.env.PORT || 3000);

// Configuración de middlewares

app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

// Configurando las rutas

app.use("/api/product", require("./routes/productRoutes"));
app.use("/api/category", require("./routes/categoryRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/location", require("./routes/locationRoutes"))
app.use("/api/provider", require("./routes/providerRoutes"))
app.use("/api/purchase", require("./routes/purchaseRoutes"));
app.use("/api/sale", require("./routes/saleRoutes"));
app.use("/api/purchase-detail", require("./routes/purchaseDetailRoutes"))
app.use("/api/sale-detail", require("./routes/saleDetailRoutes"))
app.use("/api/ticket", require("./routes/ticketRoutes"))

module.exports = app;