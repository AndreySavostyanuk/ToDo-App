require('dotenv').config()

module.exports = {
    user: process.env.DB_HOST,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
};
