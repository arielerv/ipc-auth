import { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import documentation from './documentation';
import { swaggerOptions, customCss } from '../../utils/swagger/swaggerOptions';

export default (app: Application): void => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(documentation, { swaggerOptions, customCss }));
    app.get('/docs.json', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-disposition', 'attachment; filename=ip-auth.json');
        res.send(documentation);
    });
};
