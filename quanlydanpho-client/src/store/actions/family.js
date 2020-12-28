import * as types from '../constants/types';
import {addFamilyToPerson, getFamilyData} from '../../api/family';
import {clearError, createError} from './error';

export const getFamily = (family) => {
    return {
        type: types.family.GET,
        family
    };
};

export const addFamily = (family) => {
    return {
        type: types.family.ADD_PERSON,
        family
    };
};

export const getFamilyByPersonId = (id, page = 1, limit = 10) => {
    return dispatch => {
        getFamilyData(id, page, limit)
            .then(data => {
                dispatch(clearError());
                dispatch(getFamily(data));
            })
            .catch(err => {
                dispatch(createError(err));
            })
    };
};

export const addFamilyByPersonId = (id, familyDto) => {
    return dispatch => {
        addFamilyToPerson(id, familyDto)
            .then(data => {
                dispatch(clearError());
                dispatch(addFamily(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};
