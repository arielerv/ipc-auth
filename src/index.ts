import http from 'http';
import dotenv from 'dotenv';
import { logger } from './helpers';
import app from './app';
import 'module-alias/register';

dotenv.config();

interface AddressInfo {
    address: string;
    family: string;
    port: number;
}

void (() => {
    const server = http.createServer(app);
    server.listen(process.env.APP_PORT, () => {
        const { port } = <AddressInfo>server.address();
        logger.info(`Started at port ${port} in ${process.env.NODE_ENV} environment...`);
    });
})();
