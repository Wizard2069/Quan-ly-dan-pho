import * as types from '../constants/types';
import {createPersonData, getPeopleData, getPersonData, updatePersonInfo} from '../../api/people';
import {clearError, createError} from './error';

export const updateAvailablePeople = (people) => {
    return {
        type: types.people.GET,
        people
    };
};

export const createNewPerson = (person) => {
    return {
        type: types.people.CREATE,
        person
    };
};

export const getPerson = (person) => {
    return {
        type: types.people.GET_BY_ID,
        person
    };
};

export const updatePerson = (person) => {
    return {
        type: types.people.UPDATE,
        person
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

export const createPerson = (personDto) => {
    return dispatch => {
        createPersonData(personDto)
            .then(data => {
                dispatch(clearError());
                dispatch(createNewPerson(data));
            })
            .catch(err => {
                dispatch(createError(err));
            })
    };
};

export const getPersonById = (id) => {
    return dispatch => {
        getPersonData(id)
            .then(data => {
                dispatch(clearError());
                dispatch(getPerson(data));
            })
            .catch(err => {
                dispatch(createError(err));
            })
    };
};

export const updatePersonById = (id, personDto) => {
    return dispatch => {
        updatePersonInfo(id, personDto)
            .then(data => {
                dispatch(clearError());
                dispatch(updatePerson(data));
            })
            .catch(err => {
                dispatch(createError(err));
            })
    };
};
