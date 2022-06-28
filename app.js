const express = require("express");
var bodyParser = require('body-parser')

require("dotenv").config();
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const port = process.env.PORT;
const host = process.env.HOST;
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
const allRoute = require('./App/Routes/authRoutes')
app.use(allRoute)
app.listen(port, host, () => {
  console.log(`server startd at http://${host}:${port}`);
});
