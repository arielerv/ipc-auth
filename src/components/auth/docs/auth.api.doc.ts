const getAuthEndpoint: Record<string, any> = {
    '/login/': {
        post: {
            tags: ['Auth'],
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
                    description: 'validate login success',
                    content: {},
                },
                default: {
                    description: 'Error',
                    content: {},
                },
            },
        },
    },
};

export default getAuthEndpoint;
