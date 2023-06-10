import { NextFunction, Response } from 'express';
import { getUserData, getUserActiveStatus, validateToken, login } from './session.services';
import { Login, RequestBody, ApiResponse, UserArq, Token, UserData, UserIPC } from '@/components/session/session.types';

export const handlerValidateToken = async (req: RequestBody<{token: Token}>, res: Response, next: NextFunction) => {
    try {
        const token = req.body.token;
        const { user }: ApiResponse<{user: UserArq}> = await validateToken(token);
        const [{ entities }, { active }]: UserData = await getUserData(token, user.id);
        res.status(200).send({ success: true, user: { ...user, entities, active } as UserIPC });
    } catch (err) {
        next(err);
    }
};

export const handlerLogin = async (req: RequestBody<Login>, res: Response, next: NextFunction) => {
    try {
        const { user, token }: ApiResponse<{user: UserArq, token: Token}> = await login(req.body);
        const userIpc: {user: UserIPC} = await getUserData(token, user.id);
        res.status(200).send({ success: true, user: { ...user, ...userIpc?.user }, token });
    } catch (err) {
        next(err);
    }
};
