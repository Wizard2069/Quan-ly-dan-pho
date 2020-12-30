import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {createNewUserPetition} from '../../../store/actions/userPetitions';
import RequestReplyForm from '../../../components/Form/RequestReply/RequestReplyForm';

const AddPetition = () => {
    const userPetitionData = useSelector(state => state.userPetition);
    const dispatch = useDispatch();
    
    const handleSubmit = (petitionDto) => {
        dispatch(createNewUserPetition(petitionDto));
    };
    
    return (
        <RequestReplyForm
            title='Tạo kiến nghị'
            responseData={userPetitionData}
            handleSubmit={handleSubmit}
            path='/petitions/list'
        />
    );
};

export default React.memo(AddPetition);
