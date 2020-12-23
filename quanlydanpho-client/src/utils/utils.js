import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

export const getRoles = () => {
    let roles = [];
    
    if (Cookies.get('accessToken')) {
        const data = jwtDecode(Cookies.get('accessToken'));
        roles = data.realm_access.roles;
    }
    
    return roles;
};

export const getUser = () => {
    let user;
    
    if (Cookies.get('accessToken')) {
        const data = jwtDecode(Cookies.get('accessToken'));
        user = {
            username: data.preferred_username,
            email: data.email
        };
    }
    
    return user;
};

export const toVnDateFormat = (day) => {
    const date = new Date(day);
    
    return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
};

export const toVnSex = (sex) => {
    switch (sex) {
        case 'MALE':
            return 'Nam';
        case 'FEMALE':
            return 'Nữ';
        case 'OTHER':
            return 'Khác';
        default:
            throw new Error('Invalid sex');
    }
};
