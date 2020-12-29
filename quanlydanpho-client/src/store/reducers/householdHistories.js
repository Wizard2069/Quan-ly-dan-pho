import * as types from '../constants/types';
import initialState from '../constants/initialState';

export const householdHistories = (state = initialState.householdHistories, action) => {
    switch (action.type) {
        case types.householdHistories.GET:
            return action.householdHistories;
        default:
            return state;
    }
};
