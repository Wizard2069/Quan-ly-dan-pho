import React from "react";
import {useDispatch, useSelector} from 'react-redux';

import PetitionDetail from './PetitionDetail';
import {getUserPetitionById} from '../../../store/actions/userPetitions';

const ManagerPetitionDetail = () => {
    const userPetitionData = useSelector(state => state.userPetition);
    const dispatch = useDispatch();
    
    const handleGetPetition = (id) => {
        dispatch(getUserPetitionById(id));
    };
    
    return (
        <PetitionDetail
            petitionData={userPetitionData}
            handleGetPetition={handleGetPetition}
        />
    );
}

export default React.memo(ManagerPetitionDetail);
