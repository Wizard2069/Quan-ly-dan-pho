import * as types from '../constants/types';
import {getPeopleData} from '../../api/people';
import {clearError, createError} from './error';

export const updateAvailablePeople = (people) => {
    return {
        type: types.people.GET,
        people
    };
};

export const getPeople = (
    page = 1,
    limit = 10,
    date = null,
    status = null,
    keyword = null,
    searchType = null,
    sex = null,
    age = null
) => {
    return dispatch => {
        getPeopleData(page, limit, date, status, keyword, searchType, sex, age)
            .then(data => {
                dispatch(clearError());
                dispatch(updateAvailablePeople(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};
