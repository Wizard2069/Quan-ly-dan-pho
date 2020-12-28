import * as types from '../constants/types';
import initialState from '../constants/initialState';

export const stays = (state = initialState.stays, action) => {
    switch (action.type) {
        case types.stays.GET:
            return action.stays;
        default:
            return state;
    }
};

export const stay = (state = initialState.stay, action) => {
    switch (action.type) {
        case types.stays.CREATE:
            return action.stay;
        default:
            return state;
    }
};
