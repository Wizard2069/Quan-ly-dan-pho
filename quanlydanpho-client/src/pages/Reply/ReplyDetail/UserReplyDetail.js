import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import ReplyDetail from './ReplyDetail';
import {getUserReplyById} from '../../../store/actions/userReplies';

const UserReplyDetail = () => {
    const userReplyData = useSelector(state => state.userReply);
    const dispatch = useDispatch();
    
    const handleGetReply = (id) => {
        dispatch(getUserReplyById(id));
    };
    
    return (
        <ReplyDetail
            replyData={userReplyData}
            handleGetReply={handleGetReply}
        />
    );
};

export default UserReplyDetail;
