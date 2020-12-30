import * as types from '../constants/types';
import initialState from '../constants/initialState';

export const replies = (state = initialState.replies, action) => {
    switch (action.type) {
        case types.replies.GET:
            return action.replies;
        default:
            return state;
    }
};

export const reply = (state = initialState.reply, action) => {
    switch (action.type) {
        case types.replies.GET_BY_ID:
            return action.reply;
        case types.replies.ACCEPT:
            return action.reply;
        default:
            return state;
    }
};
