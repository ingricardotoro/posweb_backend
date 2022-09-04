import express from "express";
import cors from "cors"; 
import router from "../routes";

function createServer()  {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(router);

    return app; 
}

export default createServer;