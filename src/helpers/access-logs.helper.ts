import morgan from 'morgan';
import { Handler } from 'express';

export default class AccessLogsHelper {
    // public var 
    static httpLogger: Handler;
    static getAccessLogger(fileLocation: string) {
        console.log(__dirname);
        // morgan logger for access logs
        const accessLogStream = require('file-stream-rotator').getStream({
            date_format: 'YYYYMMDD',
            filename: fileLocation,
            frequency: 'daily',
            verbose: false
        });
        this.httpLogger = morgan(
            ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', {
            stream: accessLogStream
        });
        return this.httpLogger;
    }
}