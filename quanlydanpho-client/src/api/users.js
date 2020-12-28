import axios from '../axios-server';
import {apiConfig} from './configs';

export const getUsersData = async (page = 1, limit = 10) => {
    try {
        const config = apiConfig();
        const res = await axios.get('/users', {
            ...config,
            params: {
                page,
                limit
            }
        });
        
        return res.data;
    } catch (err) {
        await Promise.reject(new Error(err.message));
    }
};

export const createUserData = async (userDto) => {
    const config = apiConfig();
    const params = new URLSearchParams();
    params.append('username', userDto.username);
    params.append('email', userDto.email);
    params.append('password', userDto.password);
    params.append('roles', userDto.roles);
    
    try {
        const res = await axios.post('/users', params, config);
        
        return res.data;
    } catch (err) {
        await Promise.reject(new Error(err.message));
    }
};
