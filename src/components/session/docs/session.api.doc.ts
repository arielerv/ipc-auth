import { SessionsEndpoint } from './session.api.doc.type';

const getSessionEndpoint: SessionsEndpoint = {
    '/session/login/': {
        post: {
            tags: ['Session'],
            operationId: 'login',
            description: 'Action to login with ARQ credentials, return token and user data.',
            requestBody: {
                description: 'Username and Password',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['username', 'password'],
                            properties: {
                                username: { type: 'string' },
                                password: {
                                    type: 'string',
                                    format: 'password',
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'validate token success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    token: {
                                        type: 'string',
                                        nullable: true,
                                    },
                                    success: {
                                        type: 'boolean',
                                        nullable: true,
                                    },
                                    user: {
                                        allOf: [{
                                            type: 'object',
                                            properties: {
                                                id: {
                                                    type: 'string',
                                                    format: 'uuid',
                                                },
                                                username: {
                                                    type: 'string',
                                                    nullable: true,
                                                },
                                                name: {
                                                    type: 'string',
                                                    nullable: true,
                                                },
                                                surname: {
                                                    type: 'string',
                                                    nullable: true,
                                                },
                                                documentId: {
                                                    type: 'string',
                                                    nullable: true,
                                                },
                                                email: {
                                                    type: 'string',
                                                    format: 'email',
                                                },
                                                deleted: {
                                                    type: 'boolean',
                                                },
                                                active: {
                                                    type: 'boolean',
                                                },
                                            },
                                        }],
                                        type: 'object',
                                        required: [
                                            'roles',
                                        ],
                                        properties: {
                                            role: {
                                                type: 'array',
                                                items: { type: 'string' },
                                            },
                                            attributes: { type: 'object' },
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
    },
};

export default getSessionEndpoint;
