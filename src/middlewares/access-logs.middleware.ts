import { Handler } from 'express';
import { LoggerHelper  } from '../helpers/logger.helper';

export default class AccessLogsMiddleware {
    // public var 
    static httpLogger: Handler;
    static getAccessLogger() {
        // morgan logger for access logs
        this.httpLogger = require('morgan')(
            ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', {
            stream: LoggerHelper.stream
        });
        return this.httpLogger;
    }
}