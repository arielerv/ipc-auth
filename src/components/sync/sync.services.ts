import fetch from 'node-fetch';
import { config } from '../../helpers';
import getSearchParams from '../../utils/getSearchParams';
import { Sync, SyncUpdate, GetSurveys, GetInformantReasonsRejected, GetPriceTypes, GetFormRejections, GetReferenceValues } from './sync.types';

const API = `${config.ENDPOINT}/v1/users`;

export const getWorkload: Sync = async (token, queries) => {
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

export const updateSurvey: SyncUpdate = async (token, surveys) => {
    const response = await fetch(`${API}/sync`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(surveys),
    });
    return response.json();
};

export const getSurveys: GetSurveys = async (token, queries) => {
    const response = await fetch(`${API}/surveys${getSearchParams(queries)}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });
    return response.json();
};

export const getInformantReasonsRejected: GetInformantReasonsRejected = async (token) => {
    const response = await fetch(`${config.ENDPOINT}/v1/informants/rejections`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });
    return response.json();
};

export const getPriceTypes: GetPriceTypes = async (token) => {
    const response = await fetch(`${config.ENDPOINT}/v1/types/price`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });
    return response.json();
};

export const getFormRejections: GetFormRejections = async (token) => {
    const response = await fetch(`${config.ENDPOINT}/v1/forms/rejections`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });
    return response.json();
};

export const getReferenceValues: GetReferenceValues = async (token, queries) => {
    const response = await fetch(`${API}/sync/reference${getSearchParams(queries)}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });
    return response.json();
};

