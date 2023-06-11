import fetch from 'node-fetch';
import { config } from '../../helpers';
import { Sync } from '../sync/sync.types';

const API = `${config.ENDPOINT}/v1/users`;

const getSearchParams = (params: object) => {
    if (!params) {
        return '';
    }
    const searchParams = new URLSearchParams();
    Object.entries(params)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, value]) => value !== undefined && value !== null)
        .forEach(([key, value]) => searchParams.append(key, value as string));
    return `?${searchParams.toString()}`;
};



export const sync: Sync = async (token, queries) => {
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
