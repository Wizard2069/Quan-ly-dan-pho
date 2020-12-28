import axios from '../axios-server';
import {apiConfig} from './configs';

export const getIdCardData = async (personId) => {
    const config = apiConfig();
    
    try {
        const res = await axios.get(`people/${personId}/id-card`, config);
        
        return res.data;
    } catch (err) {
        await Promise.reject(new Error(err.message));
    }
};

export const createIdCardData = async (personId, idCardDto) => {
    const config = apiConfig();
    const params = new URLSearchParams();
    params.append('idCardNumber', idCardDto.idCardNumber);
    params.append('issuedPlace', idCardDto.issuedPlace);
    params.append('issuedDay', idCardDto.issuedDay);
    
    try {
        const res = await axios.post(`people/${personId}/id-card`, params, config);
        
        return res.data;
    } catch (err) {
        await Promise.reject(new Error(err.message));
    }
};
