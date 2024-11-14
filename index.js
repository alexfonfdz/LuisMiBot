const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const config = require("./config/keys");
require('dotenv').config(); // Carga las variables de entorno

const app = express();
const PORT = process.env.PORT || 5000;


// Configuración de CORS para permitir solicitudes desde el origen específico
const corsOptions = {
  origin: 'http://localhost:5173', // Cambia esto al origen de tu frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true, // Permitir el uso de credenciales
  allowedHeaders: 'Content-Type,Authorization'
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Routes
const dialogFlowRoutes = require("./routes/dialogFlow");
const fulfillmentRoutes = require("./routes/fulfillment");

app.get("/api", (req, res) => {
  res.send({ hello: "there" });
});

app.use(dialogFlowRoutes);
app.use(fulfillmentRoutes);

if (process.env.NODE_ENV === "production") {
  // js and css files
  app.use(express.static("client/build"));
  // index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});