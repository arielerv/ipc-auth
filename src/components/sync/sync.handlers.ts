import { getWorkload, updateSurvey, getSurveys, getInformantReasonsRejected, getPriceTypes, getFormRejections, getReferenceSurveys } from './sync.services';
import ApiResponse from '../../utils/apiResponse';
import { HandlerGetSurveys } from '../sync/sync.types';
import SyncLog from '../../schemas/syncLog';
import { Types } from 'mongoose';
import { messages } from '@/constants';

export const handleSync: HandlerGetSurveys = async (req, res, next) => {
    try {
        const header = req.get('Authorization');
        if (!header) {
            return res.status(401).json(
                ApiResponse.errorResponse({ message: 'Unauthorized' })
            );
        }
        const token = header.replace('Bearer ', '');
        const month = req.query?.month ? Number(req.query?.month) : new Date().getMonth() + 1;
        const surveys = req.body?.surveys ;
        const date = new Date();

        //Update surveys
        if(surveys?.length) {
            const responseUpdate = await updateSurvey(token, surveys);
            if(!responseUpdate.success) {
                return res.status(300).json(
                    ApiResponse.errorResponseStep({ error: 'updateSurvey', message: responseUpdate?.message || 'error' })
                );
            }
        }

        //save sync log
        const syncLog = new SyncLog({
            '_id': new Types.ObjectId(),
            userId: req.query.userId,
            day: req.query.day,
            month,
            year: date.getFullYear(),
            surveys: surveys?.length ? JSON.stringify(surveys) : null,
        });
        await syncLog.save();

        //get workload
        const responseWorkload = await getWorkload(token, { ...req.query, month });
        if(!responseWorkload.success) {
            return res.status(300).json(
                // @ts-ignore
                ApiResponse.errorResponseStep({ error: 'getWorkload', message: responseWorkload?.message ?? messages.GENERAL_ERROR })
            );
        }

        //get surveys
        const responseSurveys = await getSurveys(token, req.query);
        if(responseSurveys.message || !responseSurveys.success) {
            return res.status(300).json(
                ApiResponse.errorResponseStep({ error: 'getSurveys', message: responseSurveys?.message || 'error' })
            );
        }

        //get Informant Reasons rejected
        const responseInformantsRejections = await getInformantReasonsRejected(token);
        const informantRejections = responseInformantsRejections.informantRejections;
        if(!responseInformantsRejections.success) {
            return res.status(300).json(
                ApiResponse.errorResponseStep({ error: 'getInformantReasonsRejected', message: responseInformantsRejections?.message || 'error' })
            );
        }

        //get Reference Surveys
        const responseReferenceSurveys = await getReferenceSurveys(token, req.query);
        if(responseSurveys.message || !responseSurveys.success) {
            return res.status(300).json(
                ApiResponse.errorResponseStep({ error: 'getSurveys', message: responseReferenceSurveys?.message || 'error' })
            );
        }

        //get Price types
        const responsePriceTypes = await getPriceTypes(token);
        const priceTypes = responsePriceTypes.priceTypes;
        if(!responsePriceTypes.success) {
            return res.status(300).json(
                ApiResponse.errorResponseStep({ error: 'getPriceTypes', message: responsePriceTypes?.message || 'error' })
            );
        }

        //get Form rejections
        const responseFormRejections = await getFormRejections(token);
        const formRejections = responseFormRejections.formRejections;
        if(!responseFormRejections.success) {
            return res.status(300).json(
                ApiResponse.errorResponseStep({ error: 'getFormRejections', message: responseFormRejections?.message || 'error' })
            );
        }

        res.status(200).json(ApiResponse.successResponse({ workload: responseWorkload.panels || responseWorkload.message, referenceSurveys: responseReferenceSurveys.referenceSurveys || [], surveys: responseSurveys.surveys, 
            staticData: { informantRejections, priceTypes, formRejections } }));
    } catch (err) {
        next(err);
    }
};
