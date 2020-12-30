import axios from '../axios-server';
import {apiConfig} from './configs';

export const getPresidentRepliesData = async (page = 1, limit = 10) => {
    const config = apiConfig();
    
    try {
        const res = await axios.get('/presidents/replies', {
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

export const createPresidentReplyData = async (replyDto) => {
    const config = apiConfig();
    const params = new URLSearchParams();
    params.append('subject', replyDto.subject);
    params.append('content', replyDto.content);
    params.append('date', replyDto.date);
    params.append('toPetition', replyDto.toPetition);
    
    try {
        const res = await axios.post('/replies', params, config);
        
        return res.data;
    } catch (err) {
        await Promise.reject(new Error(err.message));
    }
};

export const getPresidentReplyData = async (replyId) => {
    const config = apiConfig();
    
    try {
        const res = await axios.get(`/presidents/replies/${replyId}`, config);
        
        return res.data;
    } catch (err) {
        await Promise.reject(new Error(err.message));
    }
};
