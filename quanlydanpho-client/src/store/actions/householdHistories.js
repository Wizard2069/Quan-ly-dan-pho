import * as types from '../constants/types';
import {getHouseholdHistoriesData} from '../../api/householdHistories';
import {clearError, createError} from './error';

export const getHouseholdHistories = (householdHistories) => {
    return {
        type: types.householdHistories.GET,
        householdHistories
    };
};

export const getHouseholdHistoriesById = (householdId, page = 1, limit = 10) => {
    return dispatch => {
        getHouseholdHistoriesData(householdId, page, limit)
            .then(data => {
                dispatch(clearError());
                dispatch(getHouseholdHistories(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};
