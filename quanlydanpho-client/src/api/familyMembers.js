import axios from '../axios-server';
import {apiConfig} from './configs';

export const getFamilyMembersData = async (householdId, page = 1, limit = 10) => {
    const config = apiConfig();
    
    try {
        const res = await axios.get(`/households/${householdId}/members`, {
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

export const addFamilyMemberData = async (householdId, familyMemberDto) => {
    const config = apiConfig();
    
    try {
        const res = await axios.post(`/households/${householdId}/members`, {
            members: familyMemberDto
        }, {
            headers: {
                'Content-Type': 'application/json',
                ...config.headers
            }
        });
        
        return res.data;
    } catch (err) {
        await Promise.reject(new Error(err.message));
    }
};
