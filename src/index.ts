import { logger } from './helpers';
import http from 'http';
import app from './app';
import dotenv from 'dotenv';
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
