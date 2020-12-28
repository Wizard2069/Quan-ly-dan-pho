import * as types from '../constants/types';
import initialState from '../constants/initialState';

export const tempAbsents = (state = initialState.tempAbsents, action) => {
    switch (action.type) {
        case types.tempAbsents.GET:
            return action.tempAbsents;
        default:
            return state;
    }
};

export const tempAbsent = (state = initialState.tempAbsent, action) => {
    switch (action.type) {
        case types.tempAbsents.CREATE:
            return action.tempAbsent;
        default:
            return state;
    }
};
