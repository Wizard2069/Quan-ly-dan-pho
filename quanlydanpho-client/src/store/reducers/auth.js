import Cookies from 'js-cookie';

import initialState from '../constants/initialState';
import * as types from '../constants/types';

export const auth = (state = initialState.user, action) => {
    switch (action.type) {
        case types.auth.LOGIN_SUCCESS:
            const {user, token, expiresIn} = action;
            Cookies.set('accessToken', token, {
                expires: +expiresIn / 86400
            });
            
            return {
                ...state,
                authenticated: true,
                username: user.username,
                email: user.email,
                token,
                expiresIn
            };
        case types.auth.LOGOUT_SUCCESS:
            Cookies.remove('accessToken');
            
            return initialState.user;
        case types.auth.SEND_MAIL_SUCCESS:
            return {
                ...state,
                sent: true
            };
        case types.auth.CLEAR_SENT:
            return {
                ...state,
                sent: false
            };
        default:
            return state;
    }
};
