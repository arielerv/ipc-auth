interface SyncEndpoint {
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
            }
        ],
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

export interface SyncEndpoints {
    '/sync/surveys/': SyncEndpoint;
}
