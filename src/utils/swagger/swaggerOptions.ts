import { SwaggerOptions } from 'swagger-ui-express';

export const swaggerOptions: SwaggerOptions = {
    validatorUrl: null,
    defaultModelsExpandDepth: -1,
    docExpansion: 'none',
    persistAuthorization: true,
};

export const customCss =
    '.swagger-ui .topbar {background: #D9D8D8} .topbar-wrapper img {content:url(https://devarq.indec.gob.ar/assets/logoIndecRight-235.png)} .info{margin: 20px 0 !important} .information-container{display: none}';
