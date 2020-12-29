import axios from '../axios-server';
import {apiConfig} from './configs';

export const getHouseholdHistoriesData = async (householdId, page = 1, limit = 10) => {
    const config = apiConfig();
    
    try {
        const res = await axios.get(`/households/${householdId}/histories`, {
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
