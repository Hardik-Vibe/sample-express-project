import mongoose from 'mongoose';
import { LoggerHelper } from './logger.helper';

export default class DBHelper {
    static initializeConnection (dbUri: string, dbName: string) {
        mongoose.connect(dbUri, { 
            dbName: dbName,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        .then(() => {
            LoggerHelper.logger.info('db connected');
        }).catch((err: Error) => {
            LoggerHelper.logger.error(err);
        });

        mongoose.connection.on('connected', () => LoggerHelper.logger.info('db connected'));
        mongoose.connection.on('error', (err) => LoggerHelper.logger.error(err));
        mongoose.connection.on('disconnected', () => LoggerHelper.logger.info('db disconnected'));

        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            process.exit(0);
        });

        process.on('SIGABRT', async () => {
            await mongoose.connection.close();
            process.exit(0);
        });

    }
}