interface HealthEndpoint {
    get: {
        tags: string[];
        description: string;
        operationId: string;
        responses: {
            200: {
                description: string;
                content: Record<string, unknown>;
            };
            500: {
                description: string;
                content: Record<string, unknown>;
            };
        };
    };
}

export interface HealthEndpoints {
    '/health/': HealthEndpoint;
}
