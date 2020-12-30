import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import PetitionTable from './PetitionTable';
import {getAllUserPetitions} from '../../../store/actions/userPetitions';

const UserPetitionTable = () => {
    const userPetitionsData = useSelector(state => state.userPetitions);
    const dispatch = useDispatch();
    
    const handleGetUserPetitions = (page, limit) => {
        dispatch(getAllUserPetitions(page, limit));
    };
    
    return (
        <PetitionTable
            handleGetPetitions={handleGetUserPetitions}
            petitionsData={userPetitionsData}
            user={true}
        />
    );
};

export default React.memo(UserPetitionTable);
