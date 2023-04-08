import fetch from 'node-fetch';
import { config } from '../../helpers';
import { Login } from './session.types';

const API = `${config.ENDPOINT}/v1/users`;
const OAUTH_API = `${config.AUTH_ENDPOINT}/oauth`;

export const login = async (body: Login) => {
    const response = await fetch(`${OAUTH_API}/login`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            clientId: config.AUTH_CLIENT_ID,
            redirectUri: 'http://localhost:3006',
        },
    });
    return response.json();
};

export const validateToken = async (bearerToken: string) => {
    const token = bearerToken.replace('Bearer ', '');
    const response = await fetch(`${OAUTH_API}/token`, {
        method: 'POST',
        body: JSON.stringify({ token, grant_type: 'client_credentials' }),
        headers: {
            'Content-Type': 'application/json',
            clientId: config.AUTH_CLIENT_ID,
        },
    });
    return response.json();
};

export const getUserEntities = async (token: string, userId: string) => {
    const response = await fetch(`${API}/${userId}/entries`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });
    return response.json();
};

export const getUserActiveStatus = async (token: string, userId: string) => {
    const response = await fetch(`${API}/${userId}/status`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });
    return response.json();
};
