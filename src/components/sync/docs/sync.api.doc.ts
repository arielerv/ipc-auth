import { SyncEndpoints } from './sync.api.doc.type';

const getSyncEndpoint: SyncEndpoints = {
    '/sync/surveys/': {
        get: {
            tags: ['Sync'],
            security: [{ bearerAuth: [ ] }],
            description: 'Get data pre-load of surveys',
            operationId: 'getSurveys',
            parameters: [
                {
                    description: 'User`s id',
                    in: 'query',
                    name: 'userId',
                    required: true,
                    schema: { type: 'string', example: '800fdec1-a424-45eb-b5db-15b6b225ff62' },
                },
                {
                    description: 'day',
                    in: 'query',
                    name: 'day',
                    required: false,
                    schema: { type: 'integer', example: 28 },
                },
            ],
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

export default getSyncEndpoint;
