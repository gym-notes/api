import authRoute from './authRoute.js';
import workoutRoute from './workoutsRoute.js';
import exercisesRoute from './exercisesRoute.js';

export default (app) => {
  app.use('/api/auth', authRoute);
  app.use('/api/workouts', workoutRoute);
  app.use('/api/exercises', exercisesRoute);
};
