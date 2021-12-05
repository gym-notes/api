import authRoute from './authRoute.js';
import workoutRoute from './workoutsRoute.js';
import plansRoute from './plansRoute';

export default (app) => {
  app.use('/api/auth', authRoute);
  app.use('/api/workouts', workoutRoute);
  app.use('/api/plans', plansRoute);
};
