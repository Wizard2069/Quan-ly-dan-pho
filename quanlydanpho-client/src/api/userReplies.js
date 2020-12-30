import axios from '../axios-server';
import {apiConfig} from './configs';

export const getUserRepliesData = async (page = 1, limit = 10) => {
    const config = apiConfig();
    
    try {
        const res = await axios.get('/users/replies', {
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

export const getUserReplyData = async (replyId) => {
    const config = apiConfig();
    
    try {
        const res = await axios.get(`/users/replies/${replyId}`, config);
        
        return res.data;
    } catch (err) {
        await Promise.reject(new Error(err.message));
    }
};
