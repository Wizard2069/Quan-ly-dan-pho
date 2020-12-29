import {combineReducers} from 'redux';

import {auth} from './auth';
import {error} from './error';
import {loading} from './loading';
import {users, singleUser} from './users';
import {people, person} from './people';
import {family} from './family';
import {tempAbsents, tempAbsent} from './tempAbsents';
import {stays, stay} from './stays';
import {idCard} from './idCard';
import {stories, story} from './stories';
import {deaths, death} from './deaths';
import {households, household} from './households';

const rootReducer = combineReducers({
    user: auth,
    error,
    loading,
    users,
    singleUser,
    people,
    person,
    family,
    tempAbsents,
    tempAbsent,
    stays,
    stay,
    idCard,
    stories,
    story,
    deaths,
    death,
    households,
    household
});

export default rootReducer;
