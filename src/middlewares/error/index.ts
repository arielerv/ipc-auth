import { NextFunction, Request, Response } from 'express';
import { AppError, handleError } from '../../utils/appError';
import ApiResponse from '../../utils/apiResponse';

export default (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const message = 'Ha ocurrido un error, por favor inténtelo de nuevo más tarde.';
    const isOperational: boolean = handleError(err as AppError);
    if (!isOperational) {
        res.status(500).json(
            ApiResponse.errorResponse({ message })
        );
        next(err);
    } else {
        res.status(422).json(message);
    }
};
