import { Router } from 'express';
import UserController  from '../controllers/user.controller';

export default class UserRouter {
    // static
    static path = '/users';
    static router = Router();
    static getRouter () {
        const userController: UserController = new UserController();
        this.router.get(`${this.path}`, userController.index.bind(userController));
        this.router.get(`${this.path}/:id`, userController.findOne.bind(userController));
        this.router.post(`${this.path}`, userController.post.bind(userController));
        this.router.patch(`${this.path}/:id`, userController.patch.bind(userController));
        this.router.delete(`${this.path}/:id`, userController.delete.bind(userController));
        return this.router;
    }
}

