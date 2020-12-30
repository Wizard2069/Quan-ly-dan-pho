import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import PetitionTable from './PetitionTable';
import {getAllPresidentPetitions} from '../../../store/actions/presidentPetitions';

const PresidentPetitionTable = () => {
    const presidentPetitionsData = useSelector(state => state.presidentPetitions);
    const dispatch = useDispatch();
    
    const handleGetPresidentPetitions = (page, limit) => {
        dispatch(getAllPresidentPetitions(page, limit));
    };
    
    return (
        <PetitionTable
            handleGetPetitions={handleGetPresidentPetitions}
            petitionsData={presidentPetitionsData}
            president={true}
        />
    );
};

export default React.memo(PresidentPetitionTable);
