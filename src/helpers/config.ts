import dotenv from 'dotenv';
dotenv.config();

class Config {
    private static instance: Config;
    public readonly CORS_ORIGINS: string;
    public readonly NODE_ENV: string;
    public readonly APP_PORT: string;
    public readonly BODY_LIMIT: string;
    public readonly AUTH_ENDPOINT: string;
    public readonly AUTH_CLIENT_ID: string;
    public readonly ENDPOINT: string;

    constructor() {
        if (typeof Config.instance === 'object') {
            return Config.instance;
        }
        this.NODE_ENV = process.env.NODE_ENV;
        this.APP_PORT = process.env.APP_PORT;
        this.CORS_ORIGINS = process.env.CORS_ORIGINS;
        this.BODY_LIMIT = process.env.BODY_LIMIT;
        this.AUTH_ENDPOINT = process.env.AUTH_ENDPOINT;
        this.AUTH_CLIENT_ID = process.env.AUTH_CLIENT_ID;
        this.ENDPOINT = process.env.ENDPOINT;
        Config.instance = this;
        return this;
    }
}

const config = new Config();
Object.freeze(config);

export default config;
