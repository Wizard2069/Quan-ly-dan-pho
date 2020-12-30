import React from 'react';

import {getRoles} from '../../utils/utils';
import UserReplyTable from '../../components/Table/Reply/UserReplyTable';
import ManagerReplyTable from '../../components/Table/Reply/ManagerReplyTable';
import PresidentReplyTable from '../../components/Table/Reply/PresidentReplyTable';

const Reply = () => {
    const roles = getRoles();
    
    let replyTable;
    
    if (roles.includes('user')) {
        replyTable = <UserReplyTable/>;
    }
    if (roles.includes('manager')) {
        replyTable = <ManagerReplyTable/>;
    }
    if (roles.includes('president')) {
        replyTable = <PresidentReplyTable/>
    }
    
    return (
        <>
            {replyTable}
        </>
    );
};

export default Reply;
