import authRoute from './authRoute.js';
import workoutRoute from './workoutsRoute.js';
import exercisesRoute from './exercisesRoute.js';
import plansRoute from './plansRoute.js';
import accountRoute from './accountRoute.js';

export default (app) => {
  app.use('/api/auth', authRoute);
  app.use('/api/workouts', workoutRoute);
  app.use('/api/exercises', exercisesRoute);
  app.use('/api/plans', plansRoute);
  app.use('/api/accounts', accountRoute);
};
