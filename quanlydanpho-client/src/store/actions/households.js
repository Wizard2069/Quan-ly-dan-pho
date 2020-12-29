import * as types from '../constants/types';
import {createHouseholdData, getHouseholdData, getHouseholdsData} from '../../api/households';
import {clearError, createError} from './error';

export const getHouseholds = (households) => {
    return {
        type: types.households.GET,
        households
    };
};

export const createHousehold = (household) => {
    return {
        type: types.households.CREATE,
        household
    };
};

export const getHousehold = (household) => {
    return {
        type: types.households.GET_BY_ID,
        household
    };
};

export const getAllHouseholds = (page = 1, limit = 10, keyword = null, searchType = null) => {
    return dispatch => {
        getHouseholdsData(page, limit, keyword, searchType)
            .then(data => {
                dispatch(clearError());
                dispatch(getHouseholds(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};

export const createNewHousehold = (householdDto) => {
    return dispatch => {
        createHouseholdData(householdDto)
            .then(data => {
                dispatch(clearError());
                dispatch(createHousehold(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};

export const getHouseholdById = (householdId) => {
    return dispatch => {
        getHouseholdData(householdId)
            .then(data => {
                dispatch(clearError());
                dispatch(getHousehold(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};
