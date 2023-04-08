import swaggerJSDoc from 'swagger-jsdoc';

export type Endpoint = {
    [endpoint: string]: { put?: swaggerJSDoc.Operation; get?: swaggerJSDoc.Operation; post?: swaggerJSDoc.Operation };
};
