const { createPool } = require("mysql2/promise");

const pool = createPool({
    host: "localhost",
    user: "root",
    database: "libreria_roxy"
})

pool.getConnection().then(v => console.log(`Connected to the database ${v.config.database}`)).catch(err => console.log(err))
module.exports = {
    pool
};