import { getWorkload, updateSurvey, getSurveys, getInformantReasonsRejected, getPriceTypes, getFormRejections } from './sync.services';
import ApiResponse from '../../utils/apiResponse';
import { HandlerGetSurveys } from '../sync/sync.types';

export const handleSync: HandlerGetSurveys = async (req, res, next) => {
    try {
        const header = req.get('Authorization');
        if (!header) {
            return res.status(401).json(
                ApiResponse.errorResponse({ message: 'Unauthorized' })
            );
        }
        const token = header.replace('Bearer ', '');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const month = req.query?.month || new Date().getMonth() + 1;

        //Update surveys
        // @ts-ignore
        if(req.body?.surveys?.length) {
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            const responseUpdate = await updateSurvey(token, req.body.surveys);
            if(!responseUpdate.success) {
                return res.status(300).json(
                    ApiResponse.errorResponseStep({ error: 'updateSurvey', message: responseUpdate?.message || 'error' })
                );
            }
        }

        //get workload
        // @ts-ignore
        const responseWorkload = await getWorkload(token, { ...req.query, month });
        if(responseWorkload.message || !responseWorkload.success) {
            return res.status(300).json(
                // @ts-ignore
                ApiResponse.errorResponseStep({ error: 'getWorkload', message: responseWorkload?.message || 'error' })
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

        res.status(200).json(ApiResponse.successResponse({ workload: responseWorkload.panels || [], surveys: responseSurveys.surveys, staticData: { informantRejections, priceTypes, formRejections } }));
    } catch (err) {
        next(err);
    }
};
