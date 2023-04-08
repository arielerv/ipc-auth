import { NextFunction, Response } from 'express';
import { getUserEntities, getUserActiveStatus, validateToken, login } from './session.services';
import { Login, RequestBody, ApiResponse, User, Token, UserData } from '@/components/session/session.types';

const getUserData = (token: string, userId: string) =>
    Promise.all([getUserEntities(token, userId), getUserActiveStatus(token, userId)]);

export const handlerValidateToken = async (req: RequestBody<Token>, res: Response, next: NextFunction) => {
    try {
        const token = req.body.token;
        const { user }: ApiResponse<User> = await validateToken(token);
        const [{ entities }, { active }]: UserData = await getUserData(token, user.id);
        res.status(200).send({ success: true, user: { ...user, entities, active } });
    } catch (err) {
        next(err);
    }
};

export const handlerLogin = async (req: RequestBody<Login>, res: Response, next: NextFunction) => {
    try {
        const { user, token }: ApiResponse<User> = await login(req.body);
        const [{ entities }, { active }]: UserData = await getUserData(token, user.id);
        res.status(200).send({ success: true, user: { ...user, entities, active } });
    } catch (err) {
        next(err);
    }
};
