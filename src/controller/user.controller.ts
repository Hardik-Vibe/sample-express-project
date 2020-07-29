import { Request, Response } from 'express';
import User from '../model/user';

export default class UserController {
    constructor() { }

    public async index(req: Request, res: Response) {
        res.json([{
            id: 1
        }]);
    }

    public async findOne(req: Request, res: Response) {
        const { id } = req.params;
        console.log(id);
        res.json([]);
    }

    public async post(req: Request, res: Response) {
        const body = req.body;
        console.log(body);
        res.json({
            message: 'Created successfully'
        });
    }

    public async patch(req: Request, res: Response) {
        const { id } = req.params;
        const body = new User(req.body.name, req.body.email);
        res.json({
            message: 'Updated successfully'
        });
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        console.log(id);
        res.json({
            message: 'Delete successfully'
        });
    }
}