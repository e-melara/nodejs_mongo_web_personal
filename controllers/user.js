const bcrypt = require("bcrypt-node");
const User = require("../models/users");

function signUp(req, res) {
 const user = new User();
 const { email, password, repeatPassword, name, lastname } = req.body;

 user.name = name;
 user.lastname = lastname;
 user.email = email;
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

module.exports = {
 signUp
};
