import fetch from 'node-fetch';
import { config } from '../../helpers';

const API = `${config.ENDPOINT}/v1/users`;

const getSearchParams = (params: any) => {
    if (!params) {
        return '';
    }
    const searchParams = new URLSearchParams();
    Object.entries(params)
        .filter(([_, value]) => value !== undefined && value !== null)
        .forEach(([key, value]: any) => searchParams.append(key, value));
    return `?${searchParams.toString()}`;
};

export const sync = async (token: string, queries: any) => {
    const response = await fetch(`${API}/sync${getSearchParams(queries)}`, {
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
