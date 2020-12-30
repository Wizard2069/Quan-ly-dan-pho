import * as types from '../constants/types';
import initialState from '../constants/initialState';

export const userReplies = (state = initialState.userReplies, action) => {
    switch (action.type) {
        case types.userReplies.GET:
            return action.userReplies;
        default:
            return state;
    }
};

export const userReply = (state = initialState.userReply, action) => {
    switch (action.type) {
        case types.userReplies.GET_BY_ID:
            return action.reply;
        default:
            return state;
    }
};
