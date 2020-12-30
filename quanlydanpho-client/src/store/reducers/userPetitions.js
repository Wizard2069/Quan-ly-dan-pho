import * as types from '../constants/types';
import initialState from '../constants/initialState';

export const userPetitions = (state = initialState.userPetitions, action) => {
    switch (action.type) {
        case types.userPetitions.GET:
            return action.userPetitions;
        default:
            return state;
    }
};

export const userPetition = (state = initialState.userPetition, action) => {
    switch (action.type) {
        case types.userPetitions.CREATE:
            return action.petition;
        case types.userPetitions.GET_BY_ID:
            return action.petition;
        default:
            return state;
    }
};
