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
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    app: {
                                        type: 'number',
                                        example: 200,
                                    },
                                    be: {
                                        type: 'number',
                                        example: 200,
                                    },
                                    arq: {
                                        type: 'number',
                                        example: 200,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};

export default getHealthEndpoint;
