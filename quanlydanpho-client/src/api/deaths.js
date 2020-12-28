import axios from '../axios-server';
import {apiConfig} from './configs';

export const getDeathsData = async (page = 1, limit = 10, date = null) => {
    const config = apiConfig();
    let params = {page, limit};
    
    if (date) {
        params = {
            ...params,
            date
        };
    }
    
    try {
        const res = await axios.get('/people/death', {
            ...config,
            params
        });
        
        return res.data;
    } catch (err) {
        await Promise.reject(new Error(err.message));
    }
};

export const createDeathData = async (deathDto) => {
    const config = apiConfig();
    const params = new URLSearchParams();
    params.append('deathCertNumber', deathDto.deathCertNumber);
    params.append('declaredPersonIdCardNumber', deathDto.declaredPersonIdCardNumber);
    params.append('deathPersonCode', deathDto.deathPersonCode);
    params.append('declaredDay', deathDto.declaredDay);
    params.append('deathDay', deathDto.deathDay);
    params.append('deathReason', deathDto.deathReason);
    params.append('deletedManagerUsername', deathDto.deletedManagerUsername);
    
    try {
        const res = await axios.post('/people/death', params, config);
        
        return res.data;
    } catch (err) {
        await Promise.reject(new Error(err.message));
    }
};
