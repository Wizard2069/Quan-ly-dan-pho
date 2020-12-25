import React from 'react';
import {Switch, Redirect} from 'react-router-dom';

import Account from '../pages/Account/Account';
import Admin from '../pages/Admin/Admin';
import PrivateRoute from './PrivateRoute';
import RoleRoute from './RoleRoute';
import People from '../pages/People/People';
import AddPerson from '../pages/AddPerson/AddPerson';

const SideNavRoutes = () => {
    return (
        <Switch>
            <PrivateRoute path='/account' exact component={Account}/>
            <RoleRoute path='/users/list' exact component={Admin} role='admin'/>
            <RoleRoute path='/people/list' exact component={People} role='manager'/>
            <RoleRoute path='/people/add' exact component={AddPerson} role='manager'/>
            <Redirect to='/login'/>
        </Switch>
    );
};

export default SideNavRoutes;
