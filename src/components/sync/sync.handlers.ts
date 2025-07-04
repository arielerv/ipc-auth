import { Types } from 'mongoose';
import ApiResponse from '@/utils/apiResponse';
import { getWorkloadResponse } from '@/utils/responseMessages';
import { orderWorkloadInformants } from '@/utils/workloadOrder';
import SyncLog from '@/schemas/syncLog';
import WorkloadLog from '@/schemas/workloadLog';
import { messages } from '@/constants';
import {
    getFormRejections,
    getInformantReasonsRejected,
    getPriceActiveVariation,
    getPriceTypes,
    getReferenceSurveys,
    getSurveys,
    getWorkload,
    updateSurvey,
} from './sync.services';
import { HandlerGetSurveys } from './sync.types';

export const handleSync: HandlerGetSurveys = async (req, res, next) => {
    try {
        const header = req.get('Authorization');
        if (!header) {
            return res.status(401).json(ApiResponse.errorResponse({ message: 'Unauthorized' }));
        }
        const token = header.replace('Bearer ', '');
        const month = req.query?.month ? Number(req.query?.month) : new Date().getMonth() + 1;
        const surveys = req.body?.surveys;
        const progress = req.body?.progress;
        const date = new Date();

        //save sync log
        const syncLog = new SyncLog({
            _id: new Types.ObjectId(),
            userId: req.query.userId,
            day: req.query.day,
            month,
            username: req.body.username,
            name: req.body.name,
            packageName: req.body.packageName,
            panels: req.body.panels,
            year: date.getFullYear(),
            surveys: surveys?.length ? JSON.stringify(surveys) : null,
            progress: progress?.length ? JSON.stringify(progress) : null,
        });
        const savedLog = await syncLog.save();

        //Update surveys
        if (surveys?.length) {
            const responseUpdate = await updateSurvey(token, surveys);
            if (!responseUpdate.success) {
                return res.status(300).json(
                    ApiResponse.errorResponseStep({
                        error: 'updateSurvey',
                        message: responseUpdate?.message || 'error',
                    }),
                );
            }
        }

        //get workload
        const responseWorkload = await getWorkload(token, { ...req.query, month });
        if (!responseWorkload.success) {
            return res.status(300).json(
                // @ts-ignore
                ApiResponse.errorResponseStep({
                    error: 'getWorkload',
                    message: responseWorkload?.message ?? messages.GENERAL_ERROR,
                }),
            );
        }

        //get surveys
        const responseSurveys = await getSurveys(token, req.query);
        if (responseSurveys.message || !responseSurveys.success) {
            return res.status(300).json(
                ApiResponse.errorResponseStep({
                    error: 'getSurveys',
                    message: responseSurveys?.message || 'error',
                }),
            );
        }

        //get Informant Reasons rejected
        const responseInformantsRejections = await getInformantReasonsRejected(token);
        const informantRejections = responseInformantsRejections.informantRejections;
        if (!responseInformantsRejections.success) {
            return res.status(300).json(
                ApiResponse.errorResponseStep({
                    error: 'getInformantReasonsRejected',
                    message: responseInformantsRejections?.message || 'error',
                }),
            );
        }

        //get Reference Surveys
        const responseReferenceSurveys = await getReferenceSurveys(token, {
            userId: req.query.userId,
            day: req.query.day,
        });
        if (responseSurveys.message || !responseSurveys.success) {
            return res.status(300).json(
                ApiResponse.errorResponseStep({
                    error: 'getSurveys',
                    message: responseReferenceSurveys?.message || 'error',
                }),
            );
        }

        //get Price types
        const responsePriceTypes = await getPriceTypes(token);
        const priceTypes = responsePriceTypes.priceTypes;
        if (!responsePriceTypes.success) {
            return res.status(300).json(
                ApiResponse.errorResponseStep({
                    error: 'getPriceTypes',
                    message: responsePriceTypes?.message || 'error',
                }),
            );
        }

        //get Form rejections
        const responseFormRejections = await getFormRejections(token);
        const formRejections = responseFormRejections.formRejections;
        if (!responseFormRejections.success) {
            return res.status(300).json(
                ApiResponse.errorResponseStep({
                    error: 'getFormRejections',
                    message: responseFormRejections?.message || 'error',
                }),
            );
        }

        // get Price active Variation
        const responsePriceVariation = await getPriceActiveVariation(token);
        const variations = responsePriceVariation.variations;
        if (!responsePriceVariation.success) {
            return res.status(300).json(
                ApiResponse.errorResponseStep({
                    error: 'getPriceVariation',
                    message: responsePriceVariation?.message || 'error',
                }),
            );
        }

        //save workload log
        const workloadLog = new WorkloadLog({
            _id: new Types.ObjectId(),
            userId: req.query.userId,
            day: req.query.day,
            syncLogId: savedLog._id,
            month,
            year: date.getFullYear(),
            workload: responseWorkload ? JSON.stringify(responseWorkload) : null,
            responseSurveys: responseSurveys ? JSON.stringify(responseSurveys) : null,
            referenceSurveys: responseReferenceSurveys ? JSON.stringify(responseReferenceSurveys) : null,
            priceTypes: responsePriceTypes ? JSON.stringify(responsePriceTypes) : null,
            formRejections: responseFormRejections ? JSON.stringify(responseFormRejections) : null,
            priceVariation: responsePriceVariation ? JSON.stringify(responsePriceVariation) : null,
            username: req.body.username,
            name: req.body.name,
            packageName: req.body.packageName,
            panels: req.body.panels,
        });
        await workloadLog.save();

        const panels = responseWorkload.panels;
        const workloadMessage = getWorkloadResponse(panels, surveys);

        res.status(200).json(
            ApiResponse.successResponse({
                workload: panels?.length && surveys?.length ? orderWorkloadInformants(panels, surveys) : panels,
                referenceSurveys: responseReferenceSurveys.referenceSurveys || [],
                surveys: responseSurveys.surveys,
                message: workloadMessage || responseReferenceSurveys.message || responseSurveys.message,
                staticData: { informantRejections, priceTypes, formRejections, variations },
            }),
        );
    } catch (err) {
        next(err);
    }
};
