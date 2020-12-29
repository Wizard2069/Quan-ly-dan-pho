const initialState = {
    error: null,
    loading: false,
    user: {
        authenticated: false,
        username: null,
        email: null,
        token: null,
        expiresIn: null,
        sent: false
    },
    users: {},
    singleUser: {},
    people: {},
    person: {},
    family: {},
    addedFamily: {},
    tempAbsents: {},
    tempAbsent: {},
    stays: {},
    stay: {},
    idCard: {},
    stories: {},
    story: {},
    deaths: {},
    death: {},
    households: {},
    household: {},
    familyMembers: {},
    familyMember: {},
    corrections: {},
    correction: {},
    householdHistories: {}
};

export default initialState;
