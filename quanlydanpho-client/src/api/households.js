import axios from '../axios-server';
import {apiConfig} from './configs';

export const getHouseholdsData = async (
    page = 1,
    limit = 10,
    keyword = null,
    searchType = null,
) => {
    const config = apiConfig();
    let params = {page, limit};
    
    if (searchType && keyword) {
        params = {
            ...params,
            [searchType]: keyword
        };
    }
    
    try {
        const res = await axios.get('/households', {
            ...config,
            params
        });
        
        return res.data;
    } catch (err) {
        await Promise.reject(new Error(err.message));
    }
};

export const createHouseholdData = async (householdDto) => {
    const config = apiConfig();
    const params = new URLSearchParams();
    params.append('hostPersonId', householdDto.hostPersonId);
    params.append('areaCode', householdDto.areaCode);
    params.append('address', householdDto.address);
    params.append('createdDay', householdDto.createdDay);
    params.append('performerName', householdDto.performerName);
    
    try {
        const res = await axios.post('/households', params, config);
        
        return res.data;
    } catch (err) {
        await Promise.reject(new Error(err.message));
    }
};

export const getHouseholdData = async (householdId) => {
    const config = apiConfig();
    
    try {
        const res = await axios.get(`/households/${householdId}`, config);
        
        return res.data;
    } catch (err) {
        await Promise.reject(new Error(err.message));
    }
};

export const leaveHouseholdData = async (householdId, leaveDto) => {
    const config = apiConfig();
    const params = new URLSearchParams();
    params.append('leaveDate', leaveDto.leaveDate);
    params.append('leaveReason', leaveDto.leaveReason);
    params.append('performerName', leaveDto.performerName);
    params.append('newAddress', leaveDto.newAddress);
    
    try {
        const res = await axios.patch(`/households/${householdId}`, params, config);
        
        return res.data;
    } catch (err) {
        await Promise.reject(new Error(err.message));
    }
};

export const separateHouseholdData = async (householdId, separateDto) => {
    const config = apiConfig();
    const params = new URLSearchParams();
    params.append('hostId', separateDto.hostPersonId);
    params.append('areaCode', separateDto.areaCode);
    params.append('newAddress', separateDto.address);
    params.append('createdDay', separateDto.createdDay);
    params.append('performerName', separateDto.performerName);
    
    try {
        const res = await axios.patch(`/households/${householdId}/separate`, params, config);
        
        return res.data;
    } catch (err) {
        await Promise.reject(new Error(err.message));
    }
};
