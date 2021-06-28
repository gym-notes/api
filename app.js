const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
require("dotenv/config");

const swaggerOptions = {
  swaggerDefinition: {
    title: "gym notes api",
    version: "1.0.0",
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(cors());
app.use(bodyParser.json());

const workoutRoute = require("./routes/workouts");
const defaultRoute = require("./routes/defaults");

app.use("/workouts", workoutRoute);
app.use("/defaults", defaultRoute);

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

app.listen(3000, () => console.log("App listening on port 3000!"));
