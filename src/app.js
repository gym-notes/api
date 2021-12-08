import express, { json } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import installRoutes from './routes/installer.js';
import config from './config/index.js';

const app = express();

app.use(cors());
app.use(json());

installRoutes(app);

const pathName = dirname(fileURLToPath(import.meta.url));
app.get('/', (req, res) => {
  res.sendFile(path.join(pathName, '/assets/index.html'));
});

mongoose
  .connect(config.database.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((err) => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
  });

app.listen(config.app.port, () =>
  console.log(`App is up and ready to rock on port ${config.app.port}!`)
);
