import React from "react";
import {useDispatch, useSelector} from 'react-redux';

import {acceptPetitionById, getPetitionById, rejectPetitionById} from '../../../store/actions/petitions';
import PetitionDetail from './PetitionDetail';

const ManagerPetitionDetail = () => {
    const petitionData = useSelector(state => state.petition);
    const dispatch = useDispatch();
    
    const handleGetPetition = (id) => {
        dispatch(getPetitionById(id));
    };
    
    const handleRejectPetition = (id) => {
        dispatch(rejectPetitionById(id));
    };
    
    const handleAcceptPetition = (id) => {
        dispatch(acceptPetitionById(id));
    };
    
    return (
        <PetitionDetail
            petitionData={petitionData}
            handleGetPetition={handleGetPetition}
            manager={true}
            pended={petitionData?.body?.status !== 'PENDING'}
            handleRejectPetitionClick={handleRejectPetition}
            handleAcceptPetitionClick={handleAcceptPetition}
        />
    );
}

export default React.memo(ManagerPetitionDetail);
