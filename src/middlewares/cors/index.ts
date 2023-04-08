import cors, { CorsOptions } from 'cors';
import { config } from '../../helpers';

const isAcceptedOrigin = (origin: string): boolean => {
    const origins = config.CORS_ORIGINS ? config.CORS_ORIGINS.split(',') : [];
    if (!origins.length) {
        return true;
    }
    return origins
        .map((o) => new RegExp(o.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&').replace(/\*/g, 'w+')))
        .some((o) => o.test(origin));
};

const corsOptions: CorsOptions = {
    origin: function (origin: string, callback: (err: Error, allow?: boolean) => void) {
        if (!origin || isAcceptedOrigin(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`Origin '${origin}' not allowed by CORS`));
        }
    },
    optionsSuccessStatus: 200,
};

export default cors(corsOptions);
