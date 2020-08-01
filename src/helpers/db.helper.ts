import * as mongoose from 'mongoose';

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
            console.log('db connected');
        }).catch((err) => {
            console.log(err.message);
        });

        mongoose.connection.on('connected', () => console.log('db connected'));
        mongoose.connection.on('error', (err) => console.log(err.message));
        mongoose.connection.on('disconnected', () => console.log('db disconnected'));

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