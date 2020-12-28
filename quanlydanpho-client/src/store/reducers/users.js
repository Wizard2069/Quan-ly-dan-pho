import * as types from '../constants/types';
import initialState from '../constants/initialState';

export const users = (state = initialState.users, action) => {
    switch (action.type) {
        case types.users.GET:
            const {users} = action;
            
            return users;
        default:
            return state;
    }
};

export const singleUser = (state = initialState.singleUser, action) => {
    switch (action.type) {
        case types.users.CREATE:
            return action.user;
        default:
            return state;
    }
};
