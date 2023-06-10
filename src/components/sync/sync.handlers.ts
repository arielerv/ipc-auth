import { NextFunction, Response } from 'express';
import { sync } from './sync.services';
import { ApiResponse, RequestQuery } from '@/components/session/session.types';


type RequestQuerySync = {
    userId: string;
    entityId: string;
    day: string;
}

export const handlerSync = async (req: RequestQuery<RequestQuerySync>, res: Response, next: NextFunction) => {
    try {
        const header = req.get('Authorization');
        if (!header) {
            return res.sendStatus(401);
        }
        const token = header.replace('Bearer ', '');
        const { success, panels, message } : ApiResponse<{success: any, panels: any, message: any}> = await sync(token, req.query);
        if(message) {
            return res.status(300).send({ success, message });
        }
        res.status(200).send({ success, panels });
    } catch (err) {
        next(err);
    }
};
