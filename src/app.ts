import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Router } from 'express';

export default class App {
    private app: express.Application;

    constructor(routers: Array<Router>) {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeRouters(routers);
        this.listen();
    }

    private listen() {
        this.app.listen(process.env.port || 3000, () => {
            console.log(`App started on ${process.env.port || 3000}`);
        })
    }

    public getServer (): express.Application {
        return this.app;
    }

    private initializeRouters (routers: Array<any>) {
        routers.forEach((router) => this.app.use('/', router))
    }

    private  initializeMiddlewares() {
        this.app.use(bodyParser.json());
    }
}