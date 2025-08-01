import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from './logger';

dotenv.config();

class Mongoose {
    static configure() {
        const { DATABASE_URL } = process.env;
        mongoose.Promise = Promise;
        void mongoose.connect(DATABASE_URL);
        mongoose.connection.once('open', () =>
            logger.info(
                `Mongoose connected to ${mongoose.connection.host}:${mongoose.connection.port}/${mongoose.connection.db.databaseName}`,
            ),
        );
        mongoose.connection.on('close', () => logger.info('connection closed'));
        mongoose.connection.on('error', (err) => logger.error(`connection error ${err}`));
    }
}

export default Mongoose;
