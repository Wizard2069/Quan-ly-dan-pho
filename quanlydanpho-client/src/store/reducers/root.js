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
import {userPetitions, userPetition} from './userPetitions';
import {petitions, petition} from './petitions';
import {presidentPetitions, presidentPetition} from './presidentPetitions';
import {userReplies, userReply} from './userReplies';
import {replies, reply} from './replies';
import {presidentReplies, presidentReply} from './presidentReplies';

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
    householdHistories,
    userPetitions,
    userPetition,
    petitions,
    petition,
    presidentPetitions,
    presidentPetition,
    userReplies,
    userReply,
    replies,
    reply,
    presidentReplies,
    presidentReply
});

export default rootReducer;
