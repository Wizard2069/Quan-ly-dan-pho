import * as types from '../constants/types';
import {acceptReplyData, getRepliesData, getReplyData} from '../../api/replies';
import {clearError, createError} from './error';

export const getReplies = (replies) => {
    return {
        type: types.replies.GET,
        replies
    };
};

export const getReply = (reply) => {
    return {
        type: types.replies.GET_BY_ID,
        reply
    };
};

export const acceptReply = (reply) => {
    return {
        type: types.replies.ACCEPT,
        reply
    };
};

export const getAllReplies = (page = 1, limit = 10) => {
    return dispatch => {
        getRepliesData(page, limit)
            .then(data => {
                dispatch(clearError());
                dispatch(getReplies(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};

export const getReplyById = (replyId) => {
    return dispatch => {
        getReplyData(replyId)
            .then(data => {
                dispatch(clearError());
                dispatch(getReply(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};

export const acceptReplyById = (replyId) => {
    return dispatch => {
        acceptReplyData(replyId)
            .then(data => {
                dispatch(clearError());
                dispatch(acceptReply(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};
