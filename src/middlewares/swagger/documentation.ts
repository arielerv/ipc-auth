import swagger from 'swagger-jsdoc';

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
                        enum: ['https://'],
                        default: 'https://',
                    },
                },
            },
        ],
        paths: {},
    },
    apis: [],
};

export default swagger(documentation);
