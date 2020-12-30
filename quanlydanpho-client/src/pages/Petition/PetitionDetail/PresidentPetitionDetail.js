import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import PetitionDetail from './PetitionDetail';
import {getPresidentPetitionById} from '../../../store/actions/presidentPetitions';
import AddReply from '../../Reply/AddReply/AddReply';

const PresidentPetitionDetail = () => {
    const presidentPetitionData = useSelector(state => state.presidentPetition);
    const dispatch = useDispatch();
    
    const [replyDisplay, setReplyDisplay] = useState(false);
    const [petitionId, setPetitionId] = useState(null);
    
    const handleGetPetition = (id) => {
        dispatch(getPresidentPetitionById(id));
    };
    
    const handleReplyClick = (id) => {
        setReplyDisplay(true);
        setPetitionId(id);
    };
    
    let addReply = null;
    if (replyDisplay) {
        addReply = (
            <AddReply
                petitionId={petitionId}
            />
        );
    }
    
    return (
        <>
            <PetitionDetail
                petitionData={presidentPetitionData}
                handleGetPetition={handleGetPetition}
                president={true}
                handleReplyClick={handleReplyClick}
                replied={presidentPetitionData?.body?.status === 'REPLIED'}
            />
            <section>
                {addReply}
            </section>
        </>
    );
};

export default React.memo(PresidentPetitionDetail);
