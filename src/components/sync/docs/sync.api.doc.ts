import { SyncEndpoints } from './sync.api.doc.type';

const getSyncEndpoint: SyncEndpoints = {
    '/sync/workload/': {
        get: {
            tags: ['Sync'],
            security: [{ bearerAuth: [ ] }],
            description: 'Get data pre-load of workload',
            operationId: 'getWorkload',
            parameters: [
                {
                    description: 'User`s id',
                    in: 'query',
                    name: 'userId',
                    required: true,
                    schema: { type: 'string', example: '5af2d2b2-8f85-4146-bd4f-79ed06b36c16' },
                },
                {
                    description: 'day',
                    in: 'query',
                    name: 'day',
                    required: false,
                    schema: { type: 'integer', example: 1 },
                },
                {
                    description: 'month',
                    in: 'query',
                    name: 'month',
                    required: false,
                    schema: { type: 'integer', example: 6 },
                },
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
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
                                    success: { type: 'boolean' },
                                },
                            },
                            example: [
                                {
                                    id: 1,
                                    name: '1/6/2023',
                                    informants: [
                                        {
                                            id: 17140,
                                            name: 'te',
                                            street: 'asdf',
                                            informantType: 'Alquiler',
                                            doorNumber: 'test',
                                            state: 'GBA',
                                            phoneNumber: '11',
                                            forms: [
                                                {
                                                    id: 393,
                                                    name: 'Medicamentos',
                                                    varieties: [
                                                        {
                                                            id: '5111101',
                                                            name: 'Analgésico 1',
                                                            details: 'Acido acetilsalicilico 500 mg. Comprimidos por 30',
                                                            attributes: [
                                                                {
                                                                    id: 715,
                                                                    name: 'Presentación',
                                                                    label: 'Presentación',
                                                                    attributeDataType: 'Tabla Abierta',
                                                                    validations: {
                                                                        disabled: false,
                                                                        max: null,
                                                                        min: null,
                                                                    },
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                },
                default: {
                    description: 'Error',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: [
                                    'code',
                                    'message',
                                    'success',
                                ],
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
                    description: 'Success response',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean' },
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
                                                                                completed: { type: 'boolean' },
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
                                required: [
                                    'code',
                                    'message',
                                    'success',
                                ],
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
        post: {
            tags: ['Sync'],
            security: [{ bearerAuth: [ ] }],
            description: 'Post data create for surveys',
            operationId: 'postSurveys',
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
                                'id': 1690987540672,
                                'userId': '5af2d2b2-8f85-4146-bd4f-79ed06b36c16',
                                'date': '1/6/23',
                                'panelId': 1,
                                'entityId': 1,
                                'complete': true,
                                'data': {
                                    '100001': {
                                        '1019': {
                                            '1111402': {
                                                'price': 200,
                                                'type': 'A',
                                                '136': 1,
                                                'completed': true,
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
                                    status: { type: 'string' },
                                    data: { type: 'string' },
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
                                required: [
                                    'code',
                                    'message',
                                    'success',
                                ],
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
