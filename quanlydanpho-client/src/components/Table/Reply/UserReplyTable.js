import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import ReplyTable from './ReplyTable';
import {getAllUserReplies} from '../../../store/actions/userReplies';

const UserReplyTable = () => {
    const userRepliesData = useSelector(state => state.userReplies);
    const dispatch = useDispatch();
    
    const handleGetReplies = (page, limit) => {
        dispatch(getAllUserReplies(page, limit));
    };
    
    return (
        <ReplyTable
            repliesData={userRepliesData}
            handleGetReplies={handleGetReplies}
            user={true}
        />
    );
};

export default React.memo(UserReplyTable);
