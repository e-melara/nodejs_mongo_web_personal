const express = require("express");
const UserController = require("../controllers/user");

module.exports = express
 .Router()
 .post("/sign-up", UserController.signUp)
 .post("/sign-in", UserController.signIn);
