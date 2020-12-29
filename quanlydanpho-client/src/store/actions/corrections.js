import * as types from '../constants/types';
import {createCorrectionData, getCorrectionsData} from '../../api/corrections';
import {clearError, createError} from './error';

export const getCorrections = (corrections) => {
    return {
        type: types.corrections.GET,
        corrections
    };
};

export const createCorrection = (correction) => {
    return {
        type: types.corrections.CREATE,
        correction
    };
};

export const getCorrectionsByHouseholdId = (householdId, page = 1, limit = 10) => {
    return dispatch => {
        getCorrectionsData(householdId, page, limit)
            .then(data => {
                dispatch(clearError());
                dispatch(getCorrections(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};

export const createCorrectionByHouseholdId = (householdId, correctionDto) => {
    return dispatch => {
        createCorrectionData(householdId, correctionDto)
            .then(data => {
                dispatch(clearError());
                dispatch(createCorrection(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};
