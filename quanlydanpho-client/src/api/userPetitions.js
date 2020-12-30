import axios from '../axios-server';
import {apiConfig} from './configs';

export const getUserPetitionsData = async (page = 1, limit = 10) => {
    const config = apiConfig();
    
    try {
        const res = await axios.get('/users/petitions', {
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

export const createUserPetitionData = async (petitionDto) => {
    const config = apiConfig();
    const params = new URLSearchParams();
    params.append('subject', petitionDto.subject);
    params.append('content', petitionDto.content);
    params.append('date', petitionDto.date);
    
    try {
        const res = await axios.post('/petitions', params, config);
        
        return res.data;
    } catch (err) {
        await Promise.reject(new Error(err.message));
    }
};

export const getUserPetitionData = async (petitionId) => {
    const config = apiConfig();
    
    try {
        const res = await axios.get(`/users/petitions/${petitionId}`, {
            ...config
        });
        
        return res.data;
    } catch (err) {
        await Promise.reject(new Error(err.message));
    }
};
