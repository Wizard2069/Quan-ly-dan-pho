import * as types from '../constants/types';
import {createIdCardData, getIdCardData} from '../../api/idCard';
import {clearError, createError} from './error';

export const getIdCard = (idCard) => {
    return {
        type: types.idCard.GET,
        idCard
    };
};

export const createIdCard = (idCard) => {
    return {
        type: types.idCard.CREATE,
        idCard
    };
};

export const getIdCardByPersonId = (personId) => {
    return dispatch => {
        getIdCardData(personId)
            .then(data => {
                dispatch(clearError());
                dispatch(getIdCard(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};

export const createIdCardByPersonId = (personId, idCardDto) => {
    return dispatch => {
        createIdCardData(personId, idCardDto)
            .then(data => {
                dispatch(clearError());
                dispatch(createIdCard(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};
