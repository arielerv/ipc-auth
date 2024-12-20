import { GetHealthStatus } from './health.types';
import fetch from 'node-fetch';
import { config } from '@/helpers';

const API = `${config.ENDPOINT}/`;
const AUTH_API = `${config.AUTH_ENDPOINT}/`;

export const getHealthStatus = async (): Promise<GetHealthStatus> => {
    let apiResponse;
    try {
        apiResponse = await fetch(`${API}ping`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        apiResponse = { status: 304 };
    }
    let authResponse;
    try {
        authResponse = await fetch(`${AUTH_API}ping`, {
            method: 'GET',
            headers: {
                clientId: config.AUTH_CLIENT_ID,
                redirectUri: config.AUTH_REDIRECT_URI,
                'Content-Type': 'application/json',
            },
        });
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        authResponse = { status: 304 };
    }

    return { app: 200, be: apiResponse.status, arq: authResponse.status };
};
