import { Router } from 'express';
import UserController  from '../controller/user.controller';

export default class UserRouter {
    // private
    private static _userController: UserController = new UserController();

    // static
    static path = '/users';
    static router = Router();
    static getRouter () {
        this.router.get(`${this.path}`, this._userController.index);
        this.router.get(`${this.path}/:id`, this._userController.findOne);
        this.router.post(`${this.path}`, this._userController.post);
        this.router.patch(`${this.path}/:id`, this._userController.patch);
        this.router.delete(`${this.path}/:id`, this._userController.delete);
        return this.router;
    }
}

