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
    people: {}
};

export default initialState;
