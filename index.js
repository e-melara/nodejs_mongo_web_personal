const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { PORT_DB, IP_SERVER, API_VERSION } = require("./config");

const app = express();
const port = process.env.PORT || 3001;
const appRouteName = `/api/${API_VERSION}`;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors());

require("./routes")(app, appRouteName);

mongoose.connect(
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

// require("./routes")(app, appRouteName);
