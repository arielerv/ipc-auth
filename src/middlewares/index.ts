import { Application, json } from 'express';
import { config } from '../helpers';
import corsMiddleware from './cors';
import errorMiddleware from './error';
import loggingMiddleware from './logging';
import notFoundMiddleware from './notFound';
import routesMiddleware from './routes';
import applySwagger from './swagger';

export default (app: Application): void => {
    config.NODE_ENV !== 'production' && applySwagger(app);
    app.use(corsMiddleware);
    app.use(loggingMiddleware());
    app.use(json({ limit: config.BODY_LIMIT }));
    app.use(routesMiddleware);
    app.use(notFoundMiddleware);
    app.use(errorMiddleware);
};
