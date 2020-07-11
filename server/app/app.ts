import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { Routes } from "./routes";
import mongoose from "mongoose";

class App {

    public app: express.Application;
    public routePrv: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();
    }

    private config(): void {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
            next();
        });

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private mongoSetup(): void {
        mongoose.connect("mongodb://localhost:27017/propit", {})
            .then(() => console.log("connection to db successful"))
            .catch((err) => console.error(err));
    }

}

export default new App().app;