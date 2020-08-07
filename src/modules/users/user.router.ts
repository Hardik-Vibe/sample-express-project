import { Router } from 'express';
import UserController  from './user.controller';
import { JWTAuthHelper } from '../../helpers/jwt-auth.helper';

export default class UserRouter {
    // static
    static path = '/users';
    static router = Router();
    static getRouter(): Router {
        const userController: UserController = new UserController();
        this.router.get(`${this.path}`, JWTAuthHelper.verifyToken.bind(this), userController.index.bind(userController));
        this.router.get(`${this.path}/:id`, JWTAuthHelper.verifyToken.bind(this), userController.findOne.bind(userController));
        this.router.post(`${this.path}`, JWTAuthHelper.verifyToken.bind(this), userController.post.bind(userController));
        this.router.patch(`${this.path}/:id`, JWTAuthHelper.verifyToken.bind(this), userController.patch.bind(userController));
        this.router.delete(`${this.path}/:id`, JWTAuthHelper.verifyToken.bind(this), userController.delete.bind(userController));
        return this.router;
    }
}

