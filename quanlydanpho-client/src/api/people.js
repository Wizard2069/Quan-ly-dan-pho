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

export const createPersonData = async (personDto) => {
    const params = new URLSearchParams();
    params.append('fullName', personDto.fullName);
    params.append('birthday', personDto.birthday);
    params.append('sex', personDto.sex);
    params.append('job', personDto.job);
    params.append('currentAddress', personDto.currentAddress);
    params.append('alias', personDto.alias);
    params.append('birthPlace', personDto.birthPlace);
    params.append('domicile', personDto.domicile);
    params.append('nation', personDto.nation);
    params.append('religion', personDto.religion);
    params.append('nationality', personDto.nationality);
    params.append('passportNumber', personDto.passportNumber);
    params.append('permanentAddress', personDto.permanentAddress);
    params.append('academicLevel', personDto.academicLevel);
    params.append('qualification', personDto.qualification);
    params.append('ethnicLanguage', personDto.ethnicLanguage);
    params.append('languageLevel', personDto.languageLevel);
    params.append('workplace', personDto.workplace);
    params.append('criminalRecord', personDto.criminalRecord);
    params.append('createdManagerUsername', personDto.createdManagerUsername);
    params.append('createdDate', personDto.createdDate);
    params.append('note', personDto.note);
    
    try {
        let config = apiConfig();
        
        const res = await axios.post('/people', params, config);
        
        return res.data;
    } catch (err) {
        await Promise.reject(new Error(err.message));
    }
};
