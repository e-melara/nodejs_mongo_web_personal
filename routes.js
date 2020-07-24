const UserController = require("./controllers/user");

module.exports = (app, name) => {
 app.use(`${name}/sign-up`, UserController.signUp);
};
