import initialState from '../constants/initialState';
import * as types from '../constants/types';

export const error = (state = initialState.error, action) => {
    switch (action.type) {
        case types.app.ERROR:
            return action.error.message;
        case types.app.OK:
            return null;
        default:
            return state;
    }
};
