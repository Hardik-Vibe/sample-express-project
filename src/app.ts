import express from 'express';
import compression from 'compression';
import { Router } from 'express';
import * as HTTP_ERRORS from 'http-errors';
import * as dotenv from 'dotenv';
import DBHelper from './helpers/db.helper';
import AccessLogsHelper from './helpers/access-logs.helper';
import { LoggerHelper } from './helpers/logger.helper';

export default class App {
    private app: express.Application;

    constructor(routers: Array<Router>) {
        dotenv.config();
        this.app = express();
        this.initializeMiddlewares();
        this.initializeRouters(routers);
        this.appOnInit();
    }

    appOnInit(): void {
        this.initializeHelpers();
        this.initializeErrorHandlers();
        this.listen();
    }

    private listen() {
        this.app.listen(process.env.PORT || 3000, () => {
            LoggerHelper.logger.info(`App started on ${process.env.PORT || 3000}`);
        })
    }

    public getServer (): express.Application {
        return this.app;
    }

    private initializeRouters (routers: Array<Router>) {
        routers.forEach((router) => this.app.use('/', router))
    }

    private  initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(compression());
        this.app.disable('x-powered-by');
        this.app.use(AccessLogsHelper.getAccessLogger());
    }

    private initializeHelpers() {
        DBHelper.initializeConnection(process.env.DB_URI, process.env.DB_NAME);
    }

    private initializeErrorHandlers () {
        this.app.use(async (err: HTTP_ERRORS.HttpError, req: express.Request, res: express.Response, next: express.NextFunction) => {
            LoggerHelper.logger.error(err);
            next(err);
        });
    }

    
}