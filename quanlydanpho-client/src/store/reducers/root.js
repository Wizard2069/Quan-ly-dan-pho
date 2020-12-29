import {combineReducers} from 'redux';

import {auth} from './auth';
import {error} from './error';
import {loading} from './loading';
import {users, singleUser} from './users';
import {people, person} from './people';
import {family, addedFamily} from './family';
import {tempAbsents, tempAbsent} from './tempAbsents';
import {stays, stay} from './stays';
import {idCard} from './idCard';
import {stories, story} from './stories';
import {deaths, death} from './deaths';
import {households, household} from './households';
import {familyMembers, familyMember} from './familyMembers';
import {corrections, correction} from './corrections';
import {householdHistories} from './householdHistories';

const rootReducer = combineReducers({
    user: auth,
    error,
    loading,
    users,
    singleUser,
    people,
    person,
    family,
    addedFamily,
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
    household,
    familyMembers,
    familyMember,
    corrections,
    correction,
    householdHistories
});

export default rootReducer;
