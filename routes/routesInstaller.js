import authRoute from "./auth.js";
import defaultRoute from "./defaults.js";
import workoutRoute from "./workouts.js";

export default (app) => {
  app.use("/api/auth", authRoute);
  app.use("/api/defaults", defaultRoute);
  app.use("/api/workouts", workoutRoute);
};
