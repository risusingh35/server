const express = require("express");
const Route = express.Router();
const controller = require("./controller");
const middleware = require("./middleware");
// const dbConnect = require('./database')
const db = require("./dbtest");

Route.get("/", middleware.home, controller.home);
Route.get("/rk", controller.rk);
Route.get("/fs", controller.fs);
// Route.get("/mongoHighChartInsert", db.mongoHighChartInsert);
Route.get("/mongopipe", db.mongopipe);
Route.get("/mongoFlow", db.mongoFlow);
Route.get("/mongoHighChart", db.mongoHighChart);
Route.get("/outhUser", db.outhUser);

module.exports = Route;
