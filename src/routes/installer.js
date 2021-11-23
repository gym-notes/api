import authRoute from './auth.js';
import workoutRoute from './workouts.js';

export default (app) => {
  app.use('/api/auth', authRoute);
  app.use('/api/workouts', workoutRoute);
};
