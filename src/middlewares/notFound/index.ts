import { Request, Response } from 'express';
import { logger } from '@/helpers';

export default function notFoundMiddleware(req: Request, res: Response): void {
    logger.error('Not Found', {
        name: 'Not found middleware',
        statusCode: 404,
        requestedUrl: req.originalUrl,
        host: req.get('host'),
        ipAddress: req.ip || req.headers['x-forwarded-for'] || req.socket.address(),
        referer: req.get('Referer'),
        agent: req.get('User-Agent'),
    });
    res.status(404).json({
        message: 'given resource is not implemented',
        resource: req.originalUrl,
    });
}
