import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import ReplyDetail from './ReplyDetail';
import {acceptReplyById, getReplyById} from '../../../store/actions/replies';

const ManagerReplyDetail = () => {
    const replyData = useSelector(state => state.reply);
    const dispatch = useDispatch();
    
    const handleGetReply = (id) => {
        dispatch(getReplyById(id));
    };
    
    const handleAcceptReply = (id) => {
        dispatch(acceptReplyById(id));
    };
    
    return (
        <ReplyDetail
            replyData={replyData}
            handleGetReply={handleGetReply}
            manager={true}
            handleAcceptReplyClick={handleAcceptReply}
            pended={replyData.body?.status !== 'PENDING'}
        />
    );
};

export default ManagerReplyDetail;
