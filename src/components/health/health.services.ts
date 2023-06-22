import { GetHealthStatus } from './health.types';
import fetch from 'node-fetch';
import { config } from '../../helpers';

const API = `${config.ENDPOINT}/`;
const AUTH_API = `${config.AUTH_ENDPOINT}/`;

export const getHealthStatus = async (): Promise<GetHealthStatus> => {
    const apiResponse = await fetch(`${API}ping`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const authResponse = await fetch(`${AUTH_API}ping`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return { app: 200, be: apiResponse.status, arq: authResponse.status };
};
