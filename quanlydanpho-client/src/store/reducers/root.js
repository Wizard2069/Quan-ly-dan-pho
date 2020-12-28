import {combineReducers} from 'redux';

import {auth} from './auth';
import {error} from './error';
import {loading} from './loading';
import {users} from './users';
import {people, person} from './people';
import {family} from './family';

const rootReducer = combineReducers({
    user: auth,
    error,
    loading,
    users,
    people,
    person,
    family
});

export default rootReducer;
