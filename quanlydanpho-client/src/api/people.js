import axios from '../axios-server';
import {apiConfig} from './configs';

export const getPeopleData = async (
    page = 1,
    limit = 10,
    date = null,
    status = null,
    keyword = null,
    searchType = null,
    sex = null,
    age = null
) => {
    try {
        const config = apiConfig();
        let params = {page, limit};
        
        if (date) {
            params = {
                ...params,
                date
            };
        }
        if (status) {
            params = {
                ...params,
                status
            };
        }
        if (searchType && keyword) {
            params = {
                ...params,
                [searchType]: keyword
            };
        }
        if (sex) {
            params = {
                ...params,
                sex
            };
        }
        if (age) {
            params = {
                ...params,
                age
            };
        }
        
        const res = await axios.get('/people', {
            ...config,
            params
        });
        
        return res.data;
    } catch (err) {
        await Promise.reject(new Error(err.message));
    }
};
