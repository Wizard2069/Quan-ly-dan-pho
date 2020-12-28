import * as types from '../constants/types';
import initialState from '../constants/initialState';

export const deaths = (state = initialState.deaths, action) => {
    switch (action.type) {
        case types.deaths.GET:
            return action.deaths;
        default:
            return state;
    }
};

export const death = (state = initialState.death, action) => {
    switch (action.type) {
        case types.deaths.CREATE:
            return action.death;
        default:
            return state;
    }
};
