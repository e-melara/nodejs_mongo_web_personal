const UserController = require("./controllers/user");

module.exports = (app, name) => {
 app.use(`${name}/sign-up`, UserController.signUp);
 app.use(`${name}/sign-in`, UserController.signIn);
};
