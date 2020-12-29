import * as types from '../constants/types';
import {addFamilyMemberData, getFamilyMembersData} from '../../api/familyMembers';
import {clearError, createError} from './error';

export const getFamilyMembers = (familyMembers) => {
    return {
        type: types.familyMembers.GET,
        familyMembers
    };
};

export const addFamilyMember = (familyMember) => {
    return {
        type: types.familyMembers.ADD_MEMBER,
        familyMember
    };
};

export const getFamilyMembersByHouseholdId = (householdId, page = 1, limit = 10) => {
    return dispatch => {
        getFamilyMembersData(householdId, page, limit)
            .then(data => {
                dispatch(clearError());
                dispatch(getFamilyMembers(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};

export const addFamilyMemberToHousehold = (householdId, familyMemberDto) => {
    return dispatch => {
        addFamilyMemberData(householdId, familyMemberDto)
            .then(data => {
                dispatch(addFamilyMember(data));
            })
            .catch(err => {
                dispatch(createError(err));
            });
    };
};
