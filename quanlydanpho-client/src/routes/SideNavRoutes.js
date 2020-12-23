import React from 'react';
import {Switch, Redirect} from 'react-router-dom';

import Account from '../pages/Account/Account';
import Admin from '../pages/Admin/Admin';
import PrivateRoute from './PrivateRoute';
import RoleRoute from './RoleRoute';
import People from '../pages/People/People';

const SideNavRoutes = () => {
    return (
        <Switch>
            <PrivateRoute path='/account' exact component={Account}/>
            <RoleRoute path='/admin/users' exact component={Admin} role='admin'/>
            <RoleRoute path='/manager/people' exact component={People} role='manager'/>
            <Redirect to='/login'/>
        </Switch>
    );
};

export default SideNavRoutes;
