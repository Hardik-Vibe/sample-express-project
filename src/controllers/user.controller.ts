import { Request, Response, NextFunction } from 'express';
import UserModel  from '../models/user.model';
import * as HTTP_ERRORS from 'http-errors';

export default class UserController {
    private user: UserModel = null;

    constructor() {
        this.user = new UserModel();
    }

    public async index(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this.user.model.find();
            res.send(users);
        } catch (err) {
            next(new HTTP_ERRORS.InternalServerError());
        }
    }

    public async findOne(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user = await this.user.model.findById(id);
            if (!user) throw new HTTP_ERRORS.NotFound(); 
            res.send(user);
        } catch (err) {
            next(err);
        }
    }

    public async post(req: Request, res: Response, next: NextFunction) {
        try {
            const reqBody = req.body;
            const doesExit = await this.user.model.exists({ email:  reqBody.email});
            if(doesExit) throw new HTTP_ERRORS.Conflict(`${reqBody.email} is already registered !!`);
            const user = new this.user.model(reqBody);
            await user.save();
            res.sendStatus(201);
        } catch (err) {
            next(err);
        }
    }

    public async patch(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const reqBody = req.body;
            const user = await this.user.model.findById(id);
            if(!user) throw new HTTP_ERRORS.NotFound(`User not found`);
            user.overwrite({name: reqBody.name, email: reqBody.email});
            await user.save();
            res.status(200);
            res.send({
                status: 200,
                message: 'Success'
            });
        } catch (err) {
            next(err)
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user = await this.user.model.findById(id);
            if(!user) throw new HTTP_ERRORS.NotFound(`User not found`);
            await user.deleteOne();
            res.sendStatus(204);
        } catch (err) {
            next(err)
        }
    }
}