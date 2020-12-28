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
    tempAbsents: {},
    tempAbsent: {},
    stays: {},
    stay: {},
    idCard: {},
    stories: {},
    story: {},
    deaths: {},
    death: {}
};

export default initialState;
