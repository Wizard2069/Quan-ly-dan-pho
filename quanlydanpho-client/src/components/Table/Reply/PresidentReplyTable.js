import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ReplyTable from './ReplyTable';
import {getAllPresidentReplies} from '../../../store/actions/presidentReplies';

const PresidentReplyTable = () => {
    const presidentRepliesData = useSelector(state => state.presidentReplies);
    const dispatch = useDispatch();
    
    const handleGetReplies = (page, limit) => {
        dispatch(getAllPresidentReplies(page, limit));
    };
    
    return (
        <ReplyTable
            repliesData={presidentRepliesData}
            handleGetReplies={handleGetReplies}
        />
    );
};

export default React.memo(PresidentReplyTable);
