import * as types from '../constants/types';
import {acceptPetitionData, getPetitionData, getPetitionsData, rejectPetitionData} from '../../api/petitions';
import {clearError, createError} from './error';

export const getPetitions = (petitions) => {
    return {
        type: types.petitions.GET,
        petitions
    };
};

export const getPetition = (petition) => {
    return {
        type: types.petitions.GET_BY_ID,
        petition
    };
};

export const acceptPetition = (petition) => {
    return {
        type: types.petitions.ACCEPT,
        petition
    };
};

export const rejectPetition = (petition) => {
    return {
        type: types.petitions.REJECT,
        petition
    };
};

export const getAllPetitions = (page = 1, limit = 10) => {
    return dispatch => {
        getPetitionsData(page, limit)
            .then(data => {
                dispatch(clearError());
                dispatch(getPetitions(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};

export const getPetitionById = (petitionId) => {
    return dispatch => {
        getPetitionData(petitionId)
            .then(data => {
                dispatch(clearError());
                dispatch(getPetition(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};

export const acceptPetitionById = (petitionId) => {
    return dispatch => {
        acceptPetitionData(petitionId)
            .then(data => {
                dispatch(clearError());
                dispatch(acceptPetition(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};

export const rejectPetitionById = (petitionId) => {
    return dispatch => {
        rejectPetitionData(petitionId)
            .then(data => {
                dispatch(clearError());
                dispatch(rejectPetition(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};
