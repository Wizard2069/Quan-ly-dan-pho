import {apiConfig} from './configs';
import axios from '../axios-server';

export const getStaysData = async (page = 1, limit = 10, date = null) => {
    const config = apiConfig();
    
    try {
        let params = {page, limit};
    
        if (date) {
            params = {
                ...params,
                date
            };
        }
    
        const res = await axios.get('/people/stays', {
            ...config,
            params
        });
    
        return res.data;
    } catch (err) {
        await Promise.reject(new Error(err.message));
    }
};

export const createStayData = async (stayDto) => {
    const config = apiConfig();
    const params = new URLSearchParams();
    params.append('idCardNumber', stayDto.idCardNumber);
    params.append('phoneNumber', stayDto.phoneNumber);
    params.append('fromDate', stayDto.fromDate);
    params.append('toDate', stayDto.toDate);
    params.append('reason', stayDto.reason);
    
    try {
        const res = await axios.post('/people/stays', params, config);
        
        return res.data;
    } catch (err) {
        await Promise.reject(new Error(err.message));
    }
};
