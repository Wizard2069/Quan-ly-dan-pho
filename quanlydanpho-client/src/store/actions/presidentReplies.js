import * as types from '../constants/types';
import {createPresidentReplyData, getPresidentRepliesData, getPresidentReplyData} from '../../api/presidentReplies';
import {clearError, createError} from './error';

export const getPresidentReplies = (presidentReplies) => {
    return {
        type: types.presidentReplies.GET,
        presidentReplies
    };
};

export const createPresidentReply = (reply) => {
    return {
        type: types.presidentReplies.CREATE,
        reply
    };
};

export const getPresidentReply = (reply) => {
    return {
        type: types.presidentReplies.GET_BY_ID,
        reply
    };
};

export const getAllPresidentReplies = (page = 1, limit = 10) => {
    return dispatch => {
        getPresidentRepliesData(page, limit)
            .then(data => {
                dispatch(clearError());
                dispatch(getPresidentReplies(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};

export const createNewPresidentReply = (replyDto) => {
    return dispatch => {
        createPresidentReplyData(replyDto)
            .then(data => {
                dispatch(clearError());
                dispatch(createPresidentReply(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};

export const getPresidentReplyById = (replyId) => {
    return dispatch => {
        getPresidentReplyData(replyId)
            .then(data => {
                dispatch(clearError());
                dispatch(getPresidentReply(data));
            })
            .catch(err => {
                dispatch(clearError(err));
            });
    };
};
