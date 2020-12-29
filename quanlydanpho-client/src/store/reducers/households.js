import * as types from '../constants/types'
import initialState from '../constants/initialState';

export const households = (state = initialState.households, action) => {
    switch (action.type) {
        case types.households.GET:
            return action.households;
        default:
            return state;
    }
};

export const household = (state = initialState.household, action) => {
    switch (action.type) {
        case types.households.CREATE:
            return action.household;
        case types.households.GET_BY_ID:
            return action.household;
        case types.households.LEAVE:
            return action.household;
        case types.households.SEPARATE:
            return action.household;
        default:
            return state;
    }
};
