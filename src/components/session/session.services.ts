import fetch from 'node-fetch';
import { config } from '@/helpers';
import { GetUserData, LoginService } from './session.types';

const API = `${config.ENDPOINT}/v1/users`;
const PUBLIC_API = `${config.ENDPOINT}/public-api`;


export const login: LoginService = async (body) => {
    const response = await fetch(`${PUBLIC_API}/login`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            clientId: config.AUTH_CLIENT_ID,
            redirectUri: config.AUTH_REDIRECT_URI,
        },
    });
    return response.json();
};

export const getUserData: GetUserData = async (token, userId) => {
    const response = await fetch(`${API}/${userId}`, {
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
