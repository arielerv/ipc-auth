import { NextFunction, Request, Response } from 'express';
import { getHealthStatus } from './health.services';

export const handlerHealthCheck = (req: Request, res: Response, next: NextFunction): Response => {
    try {
        const healthStatus = getHealthStatus();
        return res.send(healthStatus.status);
    } catch (err) {
        next(err);
    }
};
