interface SessionEndpoint {
    post: {
        tags: string[];
        operationId: string;
        description: string;
        requestBody: {
            description: string;
            required: true;
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
    };
}

export interface SessionsEndpoint {
    '/session/login/': SessionEndpoint;
}
