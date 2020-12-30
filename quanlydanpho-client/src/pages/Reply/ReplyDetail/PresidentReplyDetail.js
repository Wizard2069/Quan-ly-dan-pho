import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import ReplyDetail from './ReplyDetail';
import {getPresidentReplyById} from '../../../store/actions/presidentReplies';

const PresidentReplyDetail = () => {
    const presidentReplyData = useSelector(state => state.presidentReply);
    const dispatch = useDispatch();
    
    const handleGetReply = (id) => {
        dispatch(getPresidentReplyById(id));
    };
    
    return (
        <ReplyDetail
            replyData={presidentReplyData}
            handleGetReply={handleGetReply}
        />
    );
};

export default PresidentReplyDetail;
