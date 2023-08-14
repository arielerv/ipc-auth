import swagger from 'swagger-jsdoc';
import HealthDocs from '../../components/health/docs';
import SessionDocs from '../../components/session/docs';
import SyncDocs from '../../components/sync/docs';

const documentation: swagger.OAS3Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'IPC Auth API',
            description: 'IP Auth API Documentation',
            version: '1.0',
        },
        servers: [
            {
                url: '{IPC_AUTH}',
                variables: {
                    IPC_AUTH: {
                        enum: ['http://localhost:3300'],
                        default: 'http://localhost:3300',
                    },
                },
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        paths: { ...HealthDocs, ...SessionDocs, ...SyncDocs },
    },
    apis: [],
};

export default swagger(documentation);
