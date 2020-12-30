import * as types from '../constants/types';
import initialState from '../constants/initialState';

export const presidentPetitions = (state = initialState.presidentPetitions, action) => {
    switch (action.type) {
        case types.presidentPetitions.GET:
            return action.presidentPetitions;
        default:
            return state;
    }
};

export const presidentPetition = (state = initialState.presidentPetition, action) => {
    switch (action.type) {
        case types.presidentPetitions.GET_BY_ID:
            return action.petition;
        default:
            return state;
    }
};
