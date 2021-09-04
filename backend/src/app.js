const express = require("express");
const morgan = require("morgan");

const app = express();

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    return next();
  });

app.use(require("./routes/alkemy"));

module.exports = app;
