import { createLogger, Logger, transports, format } from 'winston';
const { combine, timestamp , prettyPrint } = format;
const options = {
    error_logs: {
      level: 'error',
      filename: `./logs/error.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false
    },
    info_logs : {
        level: 'info',
        filename: `./logs/info.log`,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
        timestamp: timestamp
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true 
    },
};

export class LoggerHelper {
    //static var
    static logger: Logger = createLogger({
        transports: [
          new transports.File(options.error_logs),
          new transports.File(options.info_logs),
          new transports.Console(options.console)
        ],
        exitOnError: false, // do not exit on handled exceptions
        format: combine(
            timestamp(),
            prettyPrint()
        )
      });

    static stream = {
        write : (msg: string) => {
            LoggerHelper.logger.info(msg);
        }
    }
}