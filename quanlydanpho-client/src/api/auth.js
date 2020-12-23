import axios from '../axios-server';

export const getTokenData = async (email, password) => {
    const params = new URLSearchParams();
    params.append('email', email);
    params.append('password', password);
    
    try {
        const res = await axios.post('/login', params);
        
        return res.data;
    } catch (err) {
        const errMsg = err.response.data.errors[0].defaultMessage;
        await Promise.reject(new Error(errMsg));
    }
};

export const sendMailForgotPassword = async (email) => {
    const params = new URLSearchParams();
    params.append('email', email);
    
    try {
        const res = await axios.put('/reset-password', params);
        
        return res.data;
    } catch (err) {
        console.log(err);
        await Promise.reject(new Error(err.message));
    }
};
