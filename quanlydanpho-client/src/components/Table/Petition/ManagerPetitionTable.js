import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import PetitionTable from './PetitionTable';
import {getAllPetitions} from '../../../store/actions/petitions';

const ManagerPetitionTable = () => {
    const petitionsData = useSelector(state => state.petitions);
    const dispatch = useDispatch();
    
    const handleGetPetitions = (page, limit) => {
        dispatch(getAllPetitions(page, limit));
    };
    
    return (
        <PetitionTable
            handleGetPetitions={handleGetPetitions}
            petitionsData={petitionsData}
            manager={true}
        />
    );
};

export default React.memo(ManagerPetitionTable);
