import axios from '../axios-server';
import {apiConfig} from './configs';

export const getCorrectionsData = async (householdId, page = 1, limit = 10) => {
    const config = apiConfig();
    
    try {
        const res = await axios.get(`/households/${householdId}/corrections`, {
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

export const createCorrectionData = async (householdId, correctionDto) => {
    const config = apiConfig();
    const params = new URLSearchParams();
    params.append('changeInfo', correctionDto.changeInfo);
    params.append('changeFrom', correctionDto.changeFrom);
    params.append('changeTo', correctionDto.changeTo);
    params.append('changeDate', correctionDto.changeDate);
    params.append('performerName', correctionDto.performerName);
    
    try {
        const res = await axios.post(`/households/${householdId}/corrections`, params, config);
        
        return res.data;
    } catch (err) {
        await Promise.reject(new Error(err.message));
    }
};
