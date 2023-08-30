import { NextFunction, Request, Response } from 'express';
import { getHealthStatus } from './health.services';

export const handlerHealthCheck = async (_req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const healthStatus = await getHealthStatus();
        return res.send(healthStatus);
    } catch (err) {
        next(err);
    }
};
