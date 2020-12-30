import * as types from '../constants/types';
import initialState from '../constants/initialState';

export const petitions = (state = initialState.petitions, action) => {
    switch (action.type) {
        case types.petitions.GET:
            return action.petitions;
        default:
            return state;
    }
};

export const petition = (state = initialState.petition, action) => {
    switch (action.type) {
        case types.petitions.GET_BY_ID:
            return action.petition;
        case types.petitions.ACCEPT:
            return action.petition;
        case types.petitions.REJECT:
            return action.petition;
        default:
            return state;
    }
};
