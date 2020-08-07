import { Request, Response } from "express";
import { LoggerHelper } from './logger.helper';
import * as HTTP_ERRORS from 'http-errors';

export class ErrorHandlerHelper {
    static async handleError(req: Request, res: Response) {
        const error = new HTTP_ERRORS.NotFound();
        LoggerHelper.logger.error(error);
        res.status(error.statusCode).send(error.message);
    }
}