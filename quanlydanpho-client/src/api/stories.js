import axios from '../axios-server';
import {apiConfig} from './configs';

export const getStoriesData = async (personId, page = 1, limit = 10) => {
    const config = apiConfig();
    
    try {
        const res = await axios.get(`/people/${personId}/stories`, {
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

export const createStoryData = async (personId, storyDto) => {
    const config = apiConfig();
    const params = new URLSearchParams();
    params.append('fromDate', storyDto.fromDate);
    params.append('toDate', storyDto.toDate);
    params.append('address', storyDto.address);
    params.append('job', storyDto.job);
    params.append('workplace', storyDto.workplace);
    
    try {
        const res = await axios.post(`/people/${personId}/stories`, params, config);
        
        return res.data;
    } catch (err) {
        await Promise.reject(new Error(err.message));
    }
};
