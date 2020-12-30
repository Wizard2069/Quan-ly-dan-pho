import * as types from '../constants/types';
import {createUserPetitionData, getUserPetitionData, getUserPetitionsData} from '../../api/userPetitions';
import {clearError, createError} from './error';

export const getUserPetitions = (userPetitions) => {
    return {
        type: types.userPetitions.GET,
        userPetitions
    };
};

export const createUserPetition = (petition) => {
    return {
        type: types.userPetitions.CREATE,
        petition
    };
};

export const getUserPetition = (petition) => {
    return {
        type: types.userPetitions.GET_BY_ID,
        petition
    };
};

export const getAllUserPetitions = (page = 1, limit = 10) => {
    return dispatch => {
        getUserPetitionsData(page, limit)
            .then(data => {
                dispatch(clearError());
                dispatch(getUserPetitions(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};

export const createNewUserPetition = (petitionDto) => {
    return dispatch => {
        createUserPetitionData(petitionDto)
            .then(data => {
                dispatch(clearError());
                dispatch(createUserPetition(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};

export const getUserPetitionById = (petitionId) => {
    return dispatch => {
        getUserPetitionData(petitionId)
            .then(data => {
                dispatch(clearError());
                dispatch(getUserPetition(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};
