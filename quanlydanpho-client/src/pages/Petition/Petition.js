import React from 'react';

import UserPetitionTable from '../../components/Table/Petition/UserPetitionTable';
import {getRoles} from '../../utils/utils';
import ManagerPetitionTable from '../../components/Table/Petition/ManagerPetitionTable';
import PresidentPetitionTable from '../../components/Table/Petition/PresidentPetitionTable';

const Petition = () => {
    const roles = getRoles();
    
    let petitionTable = null;
    
    if (roles.includes('user')) {
        petitionTable = (<UserPetitionTable/>);
    }
    if (roles.includes('manager')) {
        petitionTable = (<ManagerPetitionTable/>);
    }
    if (roles.includes('president')) {
        petitionTable = (<PresidentPetitionTable/>);
    }
    
    return (
        <>
            {petitionTable}
        </>
    );
};

export default Petition;
