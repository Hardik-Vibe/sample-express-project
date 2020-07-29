import { Request, Response } from 'express';
import User from '../model/user';

let users: Array<User> = [
    {   
        id: '1',
        name: 'Hardik - 1',
        email: 'hardik.rajput@yahoo.in'
    },
    {   
        id: '2',
        name: 'Hardik - 2',
        email: 'hardik.rajput@yahoo.in'
    },
    {   
        id: '3',
        name: 'Hardik - 3',
        email: 'hardik.rajput@yahoo.in'
    },
    {   
        id: '4',
        name: 'Hardik - 4',
        email: 'hardik.rajput@yahoo.in'
    }
];

export default class UserController {
    constructor() { }

    public async index(req: Request, res: Response) {
        res.send(users);
    }

    public async findOne(req: Request, res: Response) {
        const { id } = req.params;
        const user: User = users.find((user: User) => user.id === id);
        res.send(user);
    }

    public async post(req: Request, res: Response) {
        const user: User = new User(req.body.name, req.body.email);
        user.id = (users.length + 1).toString();
        users = users.concat(user);
        res.status(201).send({
            message: 'User has been created successfully'
        });
    }

    public async patch(req: Request, res: Response) {
        const { id } = req.params;
        const { name, email } = req.body;
        const i: number = users.findIndex((user: User) => user.id === id);
        if (i !== -1) {
            users[i].name = name;
            users[i].email = email;
            res.send({
                message: 'User has been updated successfully'
            });
        } else {
            res.status(404).send({error: 'User not found'});
        }
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        const i: number = users.findIndex((user: User) => user.id === id);

        if (i !== -1) {
            users.splice(i,1);
            res.send({
                message: 'User has been deleted successfully'
            });
        } else {
            res.status(404).send({error: 'User not found'});
        }
    }
}