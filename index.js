const mongosee = require("mongoose");
const app = require("./app");
const port = process.env.PORT || 3001;
const { PORT_DB, IP_SERVER } = require("./config");

mongosee.connect(
 `mongodb://${IP_SERVER}:${PORT_DB}/melaradb`,
 { useNewUrlParser: true, useUnifiedTopology: true },
 err => {
  if (err) {
   throw err;
  } else {
   console.log("La conexion a la base de datos es correcta");
   app.listen(port, () => {
    console.log("Servidor esta corriendo");
   });
  }
 }
);
