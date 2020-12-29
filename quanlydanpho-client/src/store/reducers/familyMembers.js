import * as types from '../constants/types';
import initialState from '../constants/initialState';

export const familyMembers = (state = initialState.familyMembers, action) => {
    switch (action.type) {
        case types.familyMembers.GET:
            return action.familyMembers;
        default:
            return state;
    }
};

export const familyMember = (state = initialState.familyMember, action) => {
    switch (action.type) {
        case types.familyMembers.ADD_MEMBER:
            return action.familyMember;
        default:
            return state;
    }
};
