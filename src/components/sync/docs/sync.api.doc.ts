import { SyncEndpoints } from './sync.api.doc.type';

const getSyncEndpoint: SyncEndpoints = {
    '/sync/': {
        post: {
            tags: ['Sync'],
            security: [{ bearerAuth: [] }],
            description: 'Sync endpoint',
            operationId: 'handleSync',
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
                {
                    description: 'month',
                    in: 'query',
                    name: 'month',
                    required: false,
                    schema: { type: 'integer', example: 10 },
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'integer' },
                                    userId: { type: 'string' },
                                    date: { type: 'string' },
                                    panelId: { type: 'integer' },
                                    entityId: { type: 'integer' },
                                    complete: { type: 'boolean' },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            '10000': {
                                                type: 'object',
                                                properties: {
                                                    '1001': {
                                                        type: 'object',
                                                        properties: {
                                                            '101': { type: 'integer' },
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        example: [
                            {
                                id: 1690987540672,
                                userId: '5af2d2b2-8f85-4146-bd4f-79ed06b36c16',
                                date: '1/6/23',
                                panelId: 1,
                                entityId: 1,
                                complete: true,
                                data: {
                                    '100001': {
                                        '1019': {
                                            '1111402': {
                                                price: 200,
                                                type: 'A',
                                                '136': 1,
                                                complete: true,
                                            },
                                        },
                                    },
                                },
                            },
                        ],
                    },
                },
            },
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean' },
                                    user: {
                                        type: 'object',
                                        properties: {
                                            success: { type: 'boolean' },
                                            panels: {
                                                type: 'array',
                                                items: {
                                                    type: 'object',
                                                    properties: {
                                                        id: { type: 'string' },
                                                        date: { type: 'integer', nullable: true },
                                                        informants: {
                                                            type: 'array',
                                                            items: {
                                                                type: 'object',
                                                                properties: {
                                                                    id: { type: 'integer' },
                                                                    name: { type: 'string' },
                                                                    street: { type: 'string' },
                                                                    informantType: { type: 'string' },
                                                                    state: { type: 'string' },
                                                                    forms: {
                                                                        type: 'array',
                                                                        items: {
                                                                            type: 'object',
                                                                            properties: {
                                                                                id: { type: 'integer' },
                                                                                name: { type: 'string' },
                                                                                varieties: {
                                                                                    type: 'array',
                                                                                    items: {
                                                                                        type: 'object',
                                                                                        properties: {
                                                                                            id: { type: 'integer' },
                                                                                            name: { type: 'string' },
                                                                                            details: { type: 'string' },
                                                                                        },
                                                                                    },
                                                                                },
                                                                            },
                                                                        },
                                                                    },
                                                                },
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                    surveys: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: { type: 'integer' },
                                                userId: { type: 'string' },
                                                date: { type: 'string' },
                                                panelId: { type: 'integer' },
                                                entityId: { type: 'integer' },
                                                complete: { type: 'boolean' },
                                                data: {
                                                    type: 'object',
                                                    properties: {
                                                        informantId: {
                                                            type: 'object',
                                                            properties: {
                                                                formId: {
                                                                    type: 'object',
                                                                    properties: {
                                                                        varietyId: {
                                                                            type: 'object',
                                                                            properties: {
                                                                                price: { type: 'integer' },
                                                                                type: { type: 'string' },
                                                                                complete: { type: 'boolean' },
                                                                                attributeId: { type: 'string' },
                                                                            },
                                                                        },
                                                                    },
                                                                },
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                    staticData: {
                                        type: 'Object',
                                        properties: {
                                            informantRejections: {
                                                type: 'array',
                                                items: {
                                                    type: 'object',
                                                    properties: {
                                                        status: { type: 'integer' },
                                                        description: { type: 'string' },
                                                        requiredComments: { type: 'boolean' },
                                                    },
                                                },
                                            },
                                            priceTypes: {
                                                type: 'array',
                                                items: {
                                                    type: 'object',
                                                    properties: {
                                                        status: { type: 'string' },
                                                        description: { type: 'string' },
                                                    },
                                                },
                                            },
                                            formRejections: {
                                                type: 'array',
                                                items: {
                                                    type: 'object',
                                                    properties: {
                                                        status: { type: 'integer' },
                                                        description: { type: 'string' },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                default: {
                    description: 'Error',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['code', 'message', 'success'],
                                properties: {
                                    code: {
                                        type: 'integer',
                                        format: 'int32',
                                    },
                                    message: { type: 'string' },
                                    success: { type: 'boolean' },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};

export default getSyncEndpoint;
