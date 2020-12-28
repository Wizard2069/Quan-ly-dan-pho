import * as types from '../constants/types';
import {createTempAbsentData, getTempAbsentsData} from '../../api/tempAbsents';
import {clearError, createError} from './error';

export const getTempAbsents = (tempAbsents) => {
    return {
        type: types.tempAbsents.GET,
        tempAbsents
    };
};

export const createTempAbsent = (tempAbsent) => {
    return {
        type: types.tempAbsents.CREATE,
        tempAbsent
    };
};

export const getAllTempAbsents = (page = 1, limit = 10, date = null) => {
    return dispatch => {
        getTempAbsentsData(page, limit, date)
            .then(data => {
                dispatch(clearError());
                dispatch(getTempAbsents(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};

export const createNewTempAbsent = (tempAbsentDto) => {
    return dispatch => {
        createTempAbsentData(tempAbsentDto)
            .then(data => {
                dispatch(clearError());
                dispatch(createTempAbsent(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};
