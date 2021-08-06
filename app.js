import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import installRoutes from "./installers/routesInstaller.js";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(json());

installRoutes(app);

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

app.listen(3000, () =>
  console.log("App is up and ready to rock on port 3000!")
);
