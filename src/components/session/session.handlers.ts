import { getUserData, login } from './session.services';
import { HandlerLogin } from '../session/session.types';
import ApiResponse from '../../utils/apiResponse';
import { messages } from '../../constants';
import loginPermission from '../../utils/loginPermission';
import { TABLET_USERS }  from './enums/roles';

export const handlerLogin: HandlerLogin = async (req, res, next) => {
    try {
        const responseArq = await login(req.body);
        if(responseArq.error) {
            return res.status(403).json(
                ApiResponse.errorResponse({ message: responseArq.error })
            );
        }
        const hasPermission = loginPermission(TABLET_USERS, responseArq.user.roles);

        if(!hasPermission) {
            return res.status(403).json(
                ApiResponse.errorResponse({ message: messages.USER_WRONG_ROLE })
            );
        }
        
        if(!responseArq.user) {
            return res.status(404).json(
                ApiResponse.errorResponse({ message: messages.USER_NOT_FOUND })
            );
        }

        if(!responseArq.token) {
            return res.status(404).json(
                ApiResponse.errorResponse({ message: messages.INVALID_TOKEN })
            );
        }
        const responseIPC = await getUserData(responseArq.token, responseArq.user.id);

        if(!responseIPC.user) {
            return res.status(404).json(
                ApiResponse.errorResponse({ message: messages.USER_NOT_IMPORT })
            );
        }
        
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
