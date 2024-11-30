import fetch from 'node-fetch';
import { config } from '@/helpers';
import getSearchParams from '@/utils/getSearchParams';
import {
    GetFormRejections,
    GetInformantReasonsRejected,
    GetPriceTypes,
    GetPriceVariation,
    GetReferenceSurveys,
    GetSurveys,
    Sync,
    SyncUpdate,
} from './sync.types';

const API = `${config.ENDPOINT}/public-api`;

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
    const response = await fetch(`${API}/informants/rejections`, {
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
    const response = await fetch(`${API}/price/types`, {
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
    const response = await fetch(`${API}/forms/rejections`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });
    return response.json();
};

export const getPriceActiveVariation: GetPriceVariation = async (token) => {
    const response = await fetch(`${API}/variations/active`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });
    return response.json();
};

export const getReferenceSurveys: GetReferenceSurveys = async (token, queries) => {
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
