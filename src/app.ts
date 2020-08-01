import * as express from 'express';
import { Router } from 'express';
import * as HTTP_ERRORS from 'http-errors';
import * as morgan from 'morgan';
import * as dotenv from 'dotenv';
import DBHelper from './helpers/db.helper';

export default class App {
    private app: express.Application;

    constructor(routers: Array<Router>) {
        dotenv.config();
        this.app = express();
        this.initializeMiddlewares();
        this.initializeRouters(routers);
        this.initializeHelpers();
        this.initializeErrorHandlers();
        this.listen();
    }

    private listen() {
        this.app.listen(process.env.PORT || 3000, () => {
            console.log(`App started on ${process.env.PORT || 3000}`);
        })
    }

    public getServer (): express.Application {
        return this.app;
    }

    private initializeRouters (routers: Array<any>) {
        routers.forEach((router) => this.app.use('/', router))
    }

    private  initializeMiddlewares() {
        this.app.use(express.json());
    }

    private initializeHelpers() {
        this.app.use(morgan('dev'));
        DBHelper.initializeConnection(process.env.DB_URI, process.env.DB_NAME);
    }

    private initializeErrorHandlers () {
        this.app.use(async (req, res, next) => {
            next(new HTTP_ERRORS.NotFound());
        });

        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status(err.status || 500);
            res.send({
                status: err.status || 500,
                message: err.message
            });
        })
    }
}