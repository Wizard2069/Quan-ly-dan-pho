import jwtDecode from 'jwt-decode';

import * as types from '../constants/types';
import {getTokenData, sendMailForgotPassword} from '../../api/auth';
import {loaded, loading} from './loading';
import {clearError, createError} from './error';

export const loginSuccess = (user, token, expiresIn) => {
    return {
        type: types.auth.LOGIN_SUCCESS,
        user,
        token,
        expiresIn
    };
};

export const logoutSuccess = () => {
    return {
        type: types.auth.LOGOUT_SUCCESS
    };
};

export const sendMailSuccess = () => {
    return {
        type: types.auth.SEND_MAIL_SUCCESS
    };
};

export const login = (email, password) => {
    return dispatch => {
        getTokenData(email, password)
            .then(token => {
                dispatch(loading());
                dispatch(clearError());
                const jwtData = jwtDecode(token.accessToken);
                const user = {
                    username: jwtData.preferred_username,
                    email: jwtData.email,
                    roles: jwtData.realm_access.roles
                };
                dispatch(loginSuccess(user, token.accessToken, token.expiresIn));
                dispatch(loaded());
                
                return user;
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};

export const logout = () => {
    return dispatch => {
        dispatch(clearError());
        dispatch(logoutSuccess());
    };
};

export const sendMail = (email) => {
    return dispatch => {
        sendMailForgotPassword(email)
            .then(res => {
                dispatch(loading());
                dispatch(clearError());
                dispatch(sendMailSuccess());
                dispatch(loaded());
                
                return res;
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};

export const clearSentEmail = () => {
    return {
        type: types.auth.CLEAR_SENT
    };
};

export const clearSent = () => {
    return dispatch => {
        dispatch(clearSentEmail());
    };
};
