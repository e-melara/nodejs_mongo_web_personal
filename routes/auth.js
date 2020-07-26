const express = require("express");
const AuthController = require("../controllers/auth");

module.exports = express
 .Router()
 .post("/refresh-access-token", AuthController.refreshAccessToken);
