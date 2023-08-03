import { HealthEndpoints } from './health.api.doc.type';

const getHealthEndpoint: HealthEndpoints = {
    '/health/': {
        get: {
            tags: ['Health'],
            description: 'Health of the MS',
            operationId: 'health',
            responses: {
                200: {
                    description: 'Success response, the microservice is alive',
                    content: {},
                },
                500: {
                    description: 'Error response, the microservice is down',
                    content: {},
                },
            },
        },
    },
};

export default getHealthEndpoint;
