import * as types from '../constants/types';
import {createStayData, getStaysData} from '../../api/stays';
import {clearError, createError} from './error';

export const getStays = (stays) => {
    return {
        type: types.stays.GET,
        stays
    };
};

export const createStay = (stay) => {
    return {
        type: types.stays.CREATE,
        stay
    };
};

export const getAllStays = (page = 1, limit = 10, date = null) => {
    return dispatch => {
        getStaysData(page, limit, date)
            .then(data => {
                dispatch(clearError());
                dispatch(getStays(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};

export const createNewStay = (stayDto) => {
    return dispatch => {
        createStayData(stayDto)
            .then(data => {
                dispatch(clearError());
                dispatch(createStay(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};
