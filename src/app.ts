import 'module-alias/register';
import express from 'express';
import applyMiddlewares from './middlewares';

const app = express();

applyMiddlewares(app);

export default app;
