import * as types from '../constants/types';
import initialState from '../constants/initialState';

export const idCard = (state = initialState.idCard, action) => {
    switch (action.type) {
        case types.idCard.GET:
            return action.idCard;
        case types.idCard.CREATE:
            return action.idCard;
        default:
            return state;
    }
};
