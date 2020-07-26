const UserRoute = require("./routes/user");
const AuthRoute = require("./routes/auth");

module.exports = (app, name) => {
 app.use(`${name}/users`, UserRoute);
 app.use(`${name}/auth`, AuthRoute);
};
