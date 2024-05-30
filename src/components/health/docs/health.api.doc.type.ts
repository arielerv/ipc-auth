interface HealthEndpoint {
    get: {
        tags: string[];
        description: string;
        operationId: string;
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
        };
    };
}

export interface HealthEndpoints {
    '/health/': HealthEndpoint;
}
