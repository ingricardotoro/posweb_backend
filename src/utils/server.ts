import express from 'express';
import cors from 'cors';
import router from '../routes';
import deserializeUser from '../middlewares/deserializeUser';

function createServer() {
  const app = express();

  const corsOptions = {
    origin: ['https://dataplushn.com/', 'http://localhost:5173'],
    //origin: 'http://localhost:5173',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };

  app.use(cors(corsOptions));
  app.use(cors());
  app.options('*', cors());
  app.use(
    cors({
      origin: ['https://dataplushn.com/', 'http://localhost:5173'],
      //origin: 'http://localhost:5173',
    })
  );

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods', 'Authorization');
    next();
  });

  app.use(express.json());
  app.use(deserializeUser);

  app.use(router);

  return app;
}

export default createServer;
