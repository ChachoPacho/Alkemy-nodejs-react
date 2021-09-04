const { config: dotenv } = require("dotenv");
dotenv();

module.exports = {
    host: process.env.DB_host,
    user: process.env.DB_user,
    password: process.env.DB_password,
    database: process.env.database
}