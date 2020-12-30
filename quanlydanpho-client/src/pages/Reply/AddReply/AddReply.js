import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import RequestReplyForm from '../../../components/Form/RequestReply/RequestReplyForm';
import {createNewPresidentReply} from '../../../store/actions/presidentReplies';

const AddReply = (props) => {
    const presidentReplyData = useSelector(state => state.presidentReply);
    const dispatch = useDispatch();
    
    const handleSubmit = (dto) => {
        const replyDto = {
            ...dto,
            toPetition: props.petitionId
        };
        dispatch(createNewPresidentReply(replyDto));
    };
    
    return (
        <RequestReplyForm
            title='Tạo phản hồi'
            responseData={presidentReplyData}
            handleSubmit={handleSubmit}
            path='/replies/list'
        />
    );
};

export default AddReply;
