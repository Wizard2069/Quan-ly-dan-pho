import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import ReplyTable from './ReplyTable';
import {getAllReplies} from '../../../store/actions/replies';

const ManagerReplyTable = () => {
    const repliesData = useSelector(state => state.replies);
    const dispatch = useDispatch();
    
    const handleGetReplies = (page, limit) => {
        dispatch(getAllReplies(page, limit));
    };
    
    return (
        <ReplyTable
            repliesData={repliesData}
            handleGetReplies={handleGetReplies}
            manager={true}
        />
    );
};

export default React.memo(ManagerReplyTable);
