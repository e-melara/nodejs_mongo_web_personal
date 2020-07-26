const express = require("express");
const UserController = require("../controllers/user");

const { ensureAuth } = require("../middleware/autheticated");

module.exports = express
 .Router()
 .get("/users", [ensureAuth], UserController.getUsers)
 .post("/sign-up", UserController.signUp)
 .post("/sign-in", UserController.signIn);
