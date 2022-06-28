const Express = require("express");
const Route = Express.Router();
const ConUser = require("../../App/Controllers/ConAuth");
Route.post("/userAuth", ConUser.getUserByEmail);
module.exports = Route;