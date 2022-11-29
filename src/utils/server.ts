import express from 'express';
import cors from 'cors';
import router from '../routes';
import deserializeUser from '../middlewares/deserializeUser';

function createServer() {
  const app = express();

  app.options('*', cors());
  app.use(cors());
  app.use(express.json());
  app.use(deserializeUser);

  app.use(router);

  return app;
}

export default createServer;
