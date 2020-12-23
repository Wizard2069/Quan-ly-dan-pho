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
