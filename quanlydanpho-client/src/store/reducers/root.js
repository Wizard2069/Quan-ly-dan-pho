import {combineReducers} from 'redux';

import {auth} from './auth';
import {error} from './error';
import {loading} from './loading';
import {users} from './users';
import {people} from './people';

const rootReducer = combineReducers({
    user: auth,
    error,
    loading,
    users,
    people
});

export default rootReducer;
