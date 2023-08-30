import { getWorkload, updateSurvey, getSurveys } from './sync.services';
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

        res.status(200).json(ApiResponse.successResponse({ workload: responseWorkload.panels || [], surveys: responseSurveys.surveys }));
    } catch (err) {
        next(err);
    }
};
