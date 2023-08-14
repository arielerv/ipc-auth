interface GetSurveys {
    tags: string[];
    security: [{ bearerAuth: string[] }];
    description: string;
    operationId: string;
    parameters: [
        {
            description: string,
            in: string,
            name: string,
            required: boolean,
            schema: {type: string, example: string}
        },
        {
            description: string,
            in: string,
            name: string,
            required: boolean,
            schema: {type: string, example: number}
        }
    ],
    responses: {
        200: {
            description: string;
            content: Record<string, unknown>;
        };
        default: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        type: string;
                        required: string[];
                        properties: Record<string, unknown>;
                    };
                };
            };
        };
    };
}

interface PostGetSurvey {
    tags: string[];
    security: [{ bearerAuth: string[] }];
    description: string;
    operationId: string;
    requestBody: {
        required: boolean;
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
                                    [entityKey: string]: {
                                        type: 'object',
                                        properties: {
                                            [subEntityKey: string]: {
                                                type: 'object',
                                                properties: {
                                                    [propertyKey: string]: { type: 'integer' },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                example: [ Record<string, unknown>, ],
            };
        };
    };
    responses: {
        200: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        type: string;
                        properties: Record<string, unknown>;
                    };
                };
            };
        };
        default: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        type: string;
                        required: string[];
                        properties: Record<string, unknown>;
                    };
                };
            };
        };
    };
}

interface Workload {
    get: {
        tags: string[];
        security: [{ bearerAuth: string[] }];
        description: string;
        operationId: string;
        parameters: [
            {
                description: string,
                in: string,
                name: string,
                required: boolean,
                schema: {type: string, example: string}
            },
            {
                description: string,
                in: string,
                name: string,
                required: boolean,
                schema: {type: string, example: number}
            },
            {
                description: string,
                in: string,
                name: string,
                required: boolean,
                schema: {type: string, example: number}
            }
        ],
        responses: {
            200: {
                description: string;
                content: Record<string, unknown>;
            };
            default: {
                description: string;
                content: {
                    'application/json': {
                        schema: {
                            type: string;
                            required: string[];
                            properties: Record<string, unknown>;
                        };
                    };
                };
            };

        };
    };
}

interface Surveys {
    'get': GetSurveys,
    'post': PostGetSurvey
}

export interface SyncEndpoints {
    '/sync/surveys/': Surveys;
    '/sync/workload/': Workload;
}
