import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import workoutRoute from "./routes/workouts.js";
import defaultRoute from "./routes/defaults.js";

const app = express();

app.use(cors());
app.use(json());

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
