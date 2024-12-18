import { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import { customCss, swaggerOptions } from '@/utils/swagger/swaggerOptions';
import documentation from './documentation';

export default (app: Application): void => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(documentation, { swaggerOptions, customCss }));
    app.get('/docs.json', function (_req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-disposition', 'attachment; filename=ip-auth.json');
        res.send(documentation);
    });
};
