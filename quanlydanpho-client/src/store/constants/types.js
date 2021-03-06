export const app = {
    ERROR: 'qldp/app/error',
    OK: 'qldp/app/ok',
    LOADED: 'qldp/app/loaded',
    LOADING: 'qldp/app/loading'
};

export const auth = {
    LOGIN_SUCCESS: 'qldp/auth/login/success',
    LOGOUT_SUCCESS: 'qldp/auth/logout/success',
    SEND_MAIL_SUCCESS: 'qldp/auth/sendMail/success',
    CLEAR_SENT: 'qldp/auth/sendMail/clear'
};

export const users = {
    CREATE: 'qldp/users/create',
    GET: 'qldp/users/get'
};

export const people = {
    CREATE: 'qldp/people/create',
    GET: 'qldp/people/get',
    GET_BY_ID: 'qldp/people/getById',
    UPDATE: 'qldp/people/update',
    LEAVE: 'qldp/people/leave'
};

export const family = {
    ADD_PERSON: 'qldp/family/addPerson',
    GET: 'qldp/family/get'
};

export const tempAbsents = {
    CREATE: 'qldp/tempAbsents/create',
    GET: 'qldp/tempAbsents/get'
};

export const stays = {
    CREATE: 'qldp/stays/create',
    GET: 'qldp/stays/get'
};

export const idCard = {
    CREATE: 'qldp/idCard/create',
    GET: 'qldp/idCard/get'
};

export const stories = {
    CREATE: 'qldp/stories/create',
    GET: '/qldp/stories/get'
};

export const deaths = {
    CREATE: 'qldp/deaths/create',
    GET: 'qldp/deaths/get'
};

export const households = {
    CREATE: 'qldp/households/create',
    GET: 'qldp/households/get',
    GET_BY_ID: 'qldp/households/getById',
    LEAVE: 'qldp/households/leave',
    SEPARATE: 'qldp/households/separate'
};

export const familyMembers = {
    ADD_MEMBER: 'qldp/familyMembers/addMember',
    GET: 'qldp/familyMembers/get'
};

export const corrections = {
    CREATE: 'qldp/corrections/create',
    GET: 'qldp/corrections/get'
};

export const householdHistories = {
    GET: 'qldp/householdHistories/get'
};

export const userPetitions = {
    CREATE: 'qldp/userPetitions/create',
    GET: 'qldp/userPetitions/get',
    GET_BY_ID: 'qldp/userPetitions/getById'
};

export const petitions = {
    GET: 'qldp/petitions/get',
    GET_BY_ID: 'qldp/petitions/getById',
    ACCEPT: 'qldp/petitions/accept',
    REJECT: 'qldp/petitions/reject'
};

export const presidentPetitions = {
    GET: 'qldp/presidentPetitions/get',
    GET_BY_ID: 'qldp/presidentPetitions/getById'
};

export const userReplies = {
    GET: 'qldp/userReplies/get',
    GET_BY_ID: 'qldp/userReplies/getById'
};

export const replies = {
    GET: 'qldp/replies/get',
    GET_BY_ID: 'qldp/replies/getById',
    ACCEPT: 'qldp/replies/accept'
};

export const presidentReplies = {
    CREATE: 'qldp/presidentReplies/create',
    GET: 'qldp/presidentReplies/get',
    GET_BY_ID: 'qldp/presidentReplies/getById'
};
