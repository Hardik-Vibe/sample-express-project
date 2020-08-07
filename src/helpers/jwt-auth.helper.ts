import { Request, Response, NextFunction } from "express";
import * as HTTP_ERRORS from 'http-errors';

export class JWTAuthHelper {
    static verifyToken(req: Request, res: Response, next: NextFunction) {
        if (!req.headers['authorization']) {
            return res.status(401).send(new HTTP_ERRORS.Unauthorized());
        }
        // const authHeader = req.headers['authorization'];
        // const token = authHeader.split(' ')[1];
        next();
    }
}