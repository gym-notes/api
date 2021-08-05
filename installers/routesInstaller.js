import authRoute from "../routes/auth.js";
import defaultRoute from "../routes/defaults.js";
import workoutRoute from "../routes/workouts.js";

export default (app) => {
  app.use("/api/auth", authRoute);
  app.use("/api/defaults", defaultRoute);
  app.use("/api/workouts", workoutRoute);
};
