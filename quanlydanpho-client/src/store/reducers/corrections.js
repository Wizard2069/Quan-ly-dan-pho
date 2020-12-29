import * as types from '../constants/types';
import initialState from '../constants/initialState';

export const corrections = (state = initialState.corrections, action) => {
    switch (action.type) {
        case types.corrections.GET:
            return action.corrections;
        default:
            return state;
    }
};

export const correction = (state = initialState.correction, action) => {
    switch (action.type) {
        case types.corrections.CREATE:
            return action.correction;
        default:
            return state;
    }
};
