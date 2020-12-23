import * as types from '../constants/types';
import {getUsersData} from '../../api/users';
import {clearError, createError} from './error';

export const updateAvailableUsers = (users) => {
    return {
        type: types.users.GET,
        users
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
