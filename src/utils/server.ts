import express from 'express';
import cors from 'cors';
import router from '../routes';
import deserializeUser from '../middlewares/deserializeUser';

function createServer() {
  const app = express();

  const corsOptions = {
    origin: 'https://dataplushn.com',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };

  //app.use(cors(corsOptions));
  app.options('*', cors());
  app.use(cors());
  app.use(express.json());
  app.use(deserializeUser);

  app.use(router);

  return app;
}

export default createServer;
