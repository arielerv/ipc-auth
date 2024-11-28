import { createLogger, format, transports } from 'winston';

const { combine, timestamp, json, colorize } = format;

const logger = createLogger({
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        json(),
    ),
    transports: [
        new transports.Console({
            level: 'debug',
            format: combine(
                colorize({
                    all: true,
                }),
            ),
        }),
    ],
    exceptionHandlers: [
        new transports.Console({
            format: combine(
                colorize({
                    all: true,
                }),
            ),
        }),
        new transports.Console({
            level: 'error',
            format: combine(
                colorize({
                    all: true,
                }),
            ),
        }),
    ],
});

export default logger;
