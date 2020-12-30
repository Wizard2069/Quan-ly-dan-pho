import axios from '../axios-server';
import {apiConfig} from './configs';

export const getPresidentPetitionsData = async (page = 1, limit = 10) => {
    const config = apiConfig();
    
    try {
        const res = await axios.get('/presidents/petitions', {
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

export const getPresidentPetitionData = async (petitionId) => {
    const config = apiConfig();
    
    try {
        const res = await axios.get(`/presidents/petitions/${petitionId}`, config);
        
        return res.data;
    } catch (err) {
        await Promise.reject(new Error(err.message));
    }
};
