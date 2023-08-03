import { sync, syncUpdate, getSurveys } from './sync.services';
import ApiResponse from '../../utils/apiResponse';
import { HandlerGetSurveys, HandlerSync, HandlerSyncUpdate } from '../sync/sync.types';

export const handlerSync: HandlerSync = async (req, res, next) => {
    try {
        const header = req.get('Authorization');
        if (!header) {
            return res.status(401).json(
                ApiResponse.errorResponse({ message: 'Unauthorized' })
            );
        }
        const token = header.replace('Bearer ', '');
        const response = await sync(token, req.query);
        if(response.message || !response.success) {
            return res.status(300).json(
                ApiResponse.errorResponse({ message: response?.message || 'error' })
            );
        }
        res.status(200).json(ApiResponse.successResponse({ panels: response.panels || [] }));
    } catch (err) {
        next(err);
    }
};

export const handlerSyncUpdate: HandlerSyncUpdate = async (req, res, next) => {
    try {
        const header = req.get('Authorization');
        if (!header) {
            return res.status(401).json(
                ApiResponse.errorResponse({ message: 'Unauthorized' })
            );
        }
        const token = header.replace('Bearer ', '');
        const response = await syncUpdate(token, req.body);
        if(!response.success) {
            return res.status(300).json(
                ApiResponse.errorResponse({ message: response?.message || 'error' })
            );
        }
        res.status(200).json(ApiResponse.successResponse(response));
    } catch (err) {
        next(err);
    }
};

export const handlerGetSurveys: HandlerGetSurveys = async (req, res, next) => {
    try {
        const header = req.get('Authorization');
        if (!header) {
            return res.status(401).json(
                ApiResponse.errorResponse({ message: 'Unauthorized' })
            );
        }
        const token = header.replace('Bearer ', '');
        const response = await getSurveys(token, req.query);
        if(response.message || !response.success) {
            return res.status(300).json(
                ApiResponse.errorResponse({ message: response?.message || 'error' })
            );
        }
        res.status(200).json(ApiResponse.successResponse({ ...response.surveys || [] }));
    } catch (err) {
        next(err);
    }
};
