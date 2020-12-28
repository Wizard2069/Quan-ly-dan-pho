import axios from '../axios-server';
import {apiConfig} from './configs';

export const getFamilyData = async (personId, page = 1, limit = 10) => {
    const config = apiConfig();
    
    try {
        const res = await axios.get(`/people/${personId}/family`, {
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

export const addFamilyToPerson = async (id, familyDto) => {
    const config = apiConfig();
    
    try {
        const res = await axios.post(`/people/${id}/family`, {
            relations: familyDto
        }, {
                headers: {
                    'Content-Type': 'application/json',
                    ...config.headers
                }
            }
        );
        
        return res.data;
    } catch (err) {
        await Promise.reject(new Error(err.message));
    }
};
