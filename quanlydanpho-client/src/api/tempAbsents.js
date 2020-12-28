import axios from '../axios-server';
import {apiConfig} from './configs';

export const getTempAbsentsData = async (page = 1, limit = 10, date = null) => {
    const config = apiConfig();
    
    try {
        let params = {page, limit};
    
        if (date) {
            params = {
                ...params,
                date
            };
        }
        
        const res = await axios.get('/people/temp-absents', {
            ...config,
            params
        });
        
        return res.data;
    } catch (err) {
        await Promise.reject(new Error(err.message));
    }
};

export const createTempAbsentData = async (tempAbsentDto) => {
    const config = apiConfig();
    const params = new URLSearchParams();
    params.append('idCardNumber', tempAbsentDto.idCardNumber);
    params.append('tempResidentPlace', tempAbsentDto.tempResidentPlace);
    params.append('fromDate', tempAbsentDto.fromDate);
    params.append('toDate', tempAbsentDto.toDate);
    params.append('reason', tempAbsentDto.reason);
    
    try {
        const res = await axios.post('/people/temp-absents', params, config);
        
        return res.data;
    } catch (err) {
        await Promise.reject(new Error(err.message));
    }
};
