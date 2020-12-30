import React from 'react';

import {getRoles} from '../../../utils/utils';
import UserReplyDetail from './UserReplyDetail';
import ManagerReplyDetail from './ManagerReplyDetail';
import PresidentReplyDetail from './PresidentReplyDetail';

const SingleReplyDetail = () => {
    const roles = getRoles();
    
    let replyDetail;
    
    if (roles.includes('user')) {
        replyDetail = <UserReplyDetail/>;
    }
    if (roles.includes('manager')) {
        replyDetail = <ManagerReplyDetail/>;
    }
    if (roles.includes('president')) {
        replyDetail = <PresidentReplyDetail/>
    }
    
    return (
        <>
            {replyDetail}
        </>
    );
};

export default SingleReplyDetail;
