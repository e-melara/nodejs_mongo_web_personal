const bcrypt = require("bcrypt-node");
const User = require("../models/users");
const jwt = require("../services/jwt");

function signUp(req, res) {
 const user = new User();
 const { email, password, repeatPassword, name, lastname } = req.body;

 user.name = name;
 user.lastname = lastname;
 user.email = email.toLowerCase();
 user.role = "admin";
 user.active = false;

 if (!password || !repeatPassword) {
  res.status(404).send({
   message: "Las contraseña son obligatorias"
  });
 } else {
  bcrypt.hash(password, null, null, function (err, hash) {
   if (err) {
    res.status(500).send({ message: "Error al encriptar la contraseña" });
   } else {
    user.password = hash;
    user.save((err, userStored) => {
     if (err) {
      res.status(500).send({ message: "Error del servidor" });
     } else {
      if (!userStored) {
       res.status(404).send({ message: "Error al crear el usuario" });
      } else {
       res.status(200).send({ user: userStored });
      }
     }
    });
   }
  });
 }
}

function signIn(req, res) {
 const { email, password } = req.body;
 User.findOne({ email: email.toLowerCase() }, (err, userStored) => {
  if (err) {
   res.status(500).send({ message: "Error del servidor" });
  } else {
   if (!userStored) {
    res.status(500).send({ message: "Usuario no encontrado" });
   } else {
    bcrypt.compare(password, userStored.password, (err, checked) => {
     if (err) {
      res.status(500).send({ message: "Error del servidor" });
     } else {
      if (!userStored.active) {
       res.status(500).send({ message: "El usuario no se ha activado" });
      } else if (!checked) {
       res.status(404).send({ message: "La contraseña es incorrecta" });
      } else {
       res.status(200).send({
        accessToken: jwt.createAccessToken(userStored),
        refreshToken: jwt.createRefreshToken(userStored)
       });
      }
     }
    });
   }
  }
 });
}

module.exports = {
 signUp,
 signIn
};
