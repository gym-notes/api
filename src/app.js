const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

app.use(bodyParser.json());

const workoutRoute = require("./routes/workouts");

app.use("/workouts", workoutRoute);

app.get("/", (req, res) => {
  res.send("We are on home route");
});

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log("connected to DB")
);

app.listen(3000, () => console.log("App listening on port 3000!"));
