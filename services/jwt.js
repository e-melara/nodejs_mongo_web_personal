const moment = require("moment");
const jwt = require("jwt-simple");

const SECRET_KEY = "grtsja2347hjshd36492llaiwormcjs9039";

exports.createAccessToken = function (user) {
 const playload = {
  id: user._id,
  name: user.name,
  lastname: user.lastname,
  email: user.email,
  role: user.role,
  createToken: moment().unix(),
  exp: moment().add(3, "hours").unix()
 };
 return jwt.encode(playload, SECRET_KEY);
};

exports.createRefreshToken = function (user) {
 const playload = {
  id: user._id,
  exp: moment().add(30, "days").unix()
 };
 return jwt.encode(playload, SECRET_KEY);
};

exports.decodedToken = function (token) {
 return jwt.decode(token, SECRET_KEY, true);
};
