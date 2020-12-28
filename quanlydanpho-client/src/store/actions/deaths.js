import * as types from '../constants/types';
import {createDeathData, getDeathsData} from '../../api/deaths';
import {clearError, createError} from './error';

export const getDeaths = (deaths) => {
    return {
        type: types.deaths.GET,
        deaths
    };
};

export const createDeath = (death) => {
    return {
        type: types.deaths.CREATE,
        death
    };
};

export const getAllDeaths = (page = 1, limit = 10, date = null) => {
    return dispatch => {
        getDeathsData(page, limit, date)
            .then(data => {
                dispatch(clearError());
                dispatch(getDeaths(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};

export const createNewDeath = (deathDto) => {
    return dispatch => {
        createDeathData(deathDto)
            .then(data => {
                dispatch(clearError());
                dispatch(createDeath(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};
