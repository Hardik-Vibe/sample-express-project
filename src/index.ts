import App from './app';
import UserRouter from './routers/user.router';
import { userInfo } from 'os';

const app = new App([
    UserRouter.getRouter()
])