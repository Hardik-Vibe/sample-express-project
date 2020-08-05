import App from './app';
import UserRouter from './routers/user.router';

new App([
    UserRouter.getRouter()
])