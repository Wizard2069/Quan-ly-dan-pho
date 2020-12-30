import React from 'react';

import {getRoles} from '../../../utils/utils';
import ManagerPetitionDetail from './ManagerPetitionDetail';
import UserPetitionDetail from './UserPetitionDetail';
import PresidentPetitionDetail from './PresidentPetitionDetail';

const SinglePetitionDetail = () => {
    const roles = getRoles();
    
    let petitionDetail = null;
    if (roles.includes('user')) {
        petitionDetail = <UserPetitionDetail/>;
    }
    if (roles.includes('manager')) {
        petitionDetail = <ManagerPetitionDetail/>;
    }
    if (roles.includes('president')) {
        petitionDetail = <PresidentPetitionDetail/>;
    }
    
    return (
        <>
            {petitionDetail}
        </>
    );
};

export default SinglePetitionDetail;
