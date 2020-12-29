import * as types from '../constants/types';
import initialState from '../constants/initialState';

export const people = (state = initialState.people, action) => {
    switch (action.type) {
        case types.people.GET:
            return action.people;
        default:
            return state;
    }
};

export const person = (state = initialState.person, action) => {
    switch (action.type) {
        case types.people.CREATE:
            return action.person;
        case types.people.GET_BY_ID:
            return action.person;
        case types.people.UPDATE:
            return action.person;
        case types.people.LEAVE:
            return action.person;
        default:
            return state;
    }
};
