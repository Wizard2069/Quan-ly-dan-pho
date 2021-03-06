import * as types from '../constants/types';
import {createUserData, getUsersData} from '../../api/users';
import {clearError, createError} from './error';

export const updateAvailableUsers = (users) => {
    return {
        type: types.users.GET,
        users
    };
};

export const createUser = (user) => {
    return {
        type: types.users.CREATE,
        user
    };
};

export const getUsers = (page = 1, limit = 10) => {
    return dispatch => {
        getUsersData(page, limit)
            .then(data => {
                dispatch(clearError());
                dispatch(updateAvailableUsers(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};

export const createNewUser = (userDto) => {
    return dispatch => {
        createUserData(userDto)
            .then(data => {
                dispatch(clearError());
                dispatch(createUser(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};
