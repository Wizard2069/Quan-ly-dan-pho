import axios from '../axios-server';
import {apiConfig} from './configs';

export const getRepliesData = async (page = 1, limit = 10) => {
    const config = apiConfig();
    
    try {
        const res = await axios.get('/replies', {
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

export const getReplyData = async (replyId) => {
    const config = apiConfig();
    
    try {
        const res = await axios.get(`/replies/${replyId}`, config);
        
        return res.data;
    } catch (err) {
        await Promise.reject(new Error(err.message));
    }
};

export const acceptReplyData = async (replyId) => {
    const config = apiConfig();
    
    try {
        const res = await axios.patch(`/replies/${replyId}/accept`, {}, config);
        
        return res.data;
    } catch (err) {
        await Promise.reject(new Error(err.message));
    }
};
