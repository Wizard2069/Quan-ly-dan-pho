import * as types from '../constants/types';
import {getUserRepliesData, getUserReplyData} from '../../api/userReplies';
import {clearError, createError} from './error';

export const getUserReplies = (userReplies) => {
    return {
        type: types.userReplies.GET,
        userReplies
    };
};

export const getUserReply = (reply) => {
    return {
        type: types.userReplies.GET_BY_ID,
        reply
    };
};

export const getAllUserReplies = (page = 1, limit = 10) => {
    return dispatch => {
        getUserRepliesData(page, limit)
            .then(data => {
                dispatch(clearError());
                dispatch(getUserReplies(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};

export const getUserReplyById = (replyId) => {
    return dispatch => {
        getUserReplyData(replyId)
            .then(data => {
                dispatch(clearError());
                dispatch(getUserReply(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};
