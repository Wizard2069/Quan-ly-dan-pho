import Cookies from 'js-cookie';

export const apiConfig = () => {
    const token = Cookies.get('accessToken');
    
    return {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
};
