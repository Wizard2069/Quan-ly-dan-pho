import * as types from '../constants/types';
import initialState from '../constants/initialState';

export const presidentReplies = (state = initialState.presidentReplies, action) => {
    switch (action.type) {
        case types.presidentReplies.GET:
            return action.presidentReplies;
        default:
            return state;
    }
};

export const presidentReply = (state = initialState.presidentReply, action) => {
    switch (action.type) {
        case types.presidentReplies.CREATE:
            return action.reply;
        case types.presidentReplies.GET_BY_ID:
            return action.reply;
        default:
            return state;
    }
};
