import * as types from '../constants/types';
import {getPresidentPetitionData, getPresidentPetitionsData} from '../../api/presidentPetitions';
import {clearError, createError} from './error';

export const getPresidentPetitions = (presidentPetitions) => {
    return {
        type: types.presidentPetitions.GET,
        presidentPetitions
    };
};

export const getPresidentPetition = (petition) => {
    return {
        type: types.presidentPetitions.GET_BY_ID,
        petition
    };
};

export const getAllPresidentPetitions = (page = 1, limit = 10) => {
    return dispatch => {
        getPresidentPetitionsData(page, limit)
            .then(data => {
                dispatch(clearError());
                dispatch(getPresidentPetitions(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};

export const getPresidentPetitionById = (petitionId) => {
    return dispatch => {
        getPresidentPetitionData(petitionId)
            .then(data => {
                dispatch(clearError());
                dispatch(getPresidentPetition(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};
