import 'dotenv/config';

export default {
  app: {
    port: parseInt(process.env.APPLICATION_PORT, 10) || 3000,
  },
  database: {
    connectionString: process.env.DB_CONNECTION,
  },
  jwt: {
    lifeTime:
      parseInt(process.env.ACCESS_TOKEN_LIFETIME_IN_SECONDS, 10) || 3600,
    secret: process.env.ACCESS_TOKEN_SECRET || 'long-string-hard-to-break',
  },
};
