const mysql = require("mysql2/promise");

const config = require("./config");

module.exports = async () => await mysql.createConnection(config);