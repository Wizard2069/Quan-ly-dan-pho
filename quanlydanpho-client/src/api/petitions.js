import axios from '../axios-server';
import {apiConfig} from './configs';

export const getPetitionsData = async (page = 1, limit = 10) => {
    const config = apiConfig();
    
    try {
        const res = await axios.get('/petitions', {
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

export const getPetitionData = async (petitionId) => {
    const config = apiConfig();
    
    try {
        const res = await axios.get(`/petitions/${petitionId}`, {
            ...config
        });
        
        return res.data;
    } catch (err) {
        await Promise.reject(new Error(err.message));
    }
};

export const acceptPetitionData = async (petitionId) => {
    const config = apiConfig();
    
    try {
        const res = await axios.patch(`/petitions/${petitionId}/accept`, {}, config);
        
        return res.data;
    } catch (err) {
        await Promise.reject(new Error(err.message));
    }
};

export const rejectPetitionData = async (petitionId) => {
    const config = apiConfig();
    
    try {
        const res = await axios.delete(`/petitions/${petitionId}/reject`, config);
        
        return res.data;
    } catch (err) {
        await Promise.reject(new Error(err.message));
    }
};
