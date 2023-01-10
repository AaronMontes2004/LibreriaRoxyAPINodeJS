const { createPool } = require("mysql2/promise");

const pool = createPool({
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "libreria_roxy"
})

pool.getConnection().then(v => console.log(`Connected to the database ${v.config.database}`)).catch(err => console.log(err))
module.exports = {
    pool
};