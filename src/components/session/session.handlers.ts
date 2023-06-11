import { getUserData, login } from './session.services';
import { HandlerLogin } from '../session/session.types';
import ApiResponse from '../../utils/apiResponse';

export const handlerLogin: HandlerLogin = async (req, res, next) => {
    try {
        const responseArq = await login(req.body);
        if(responseArq.message) {
            return res.status(304).json(
                ApiResponse.errorResponse({ message: responseArq.message })
            );
        }
        const responseIPC = await getUserData(responseArq.token, responseArq.user.id);
        if(responseIPC.message) {
            return res.status(304).json(
                ApiResponse.errorResponse({ message: responseIPC.message })
            );
        }

        res.status(200).json(ApiResponse.successResponse({
            user: { ...responseArq.user, ...responseIPC?.user },
            token: responseArq.token,
        }));
    } catch (err) {
        next(err);
    }
};
