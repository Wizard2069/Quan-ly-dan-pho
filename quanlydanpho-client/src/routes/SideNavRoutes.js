import React from 'react';
import {Switch, Redirect} from 'react-router-dom';

import Account from '../pages/Account/Account';
import Admin from '../pages/Admin/Admin';
import PrivateRoute from './PrivateRoute';
import RoleRoute from './RoleRoute';
import People from '../pages/People/People';
import AddPerson from '../pages/People/AddPerson/AddPerson';
import PersonDetail from '../pages/People/PersonDetail/PersonDetail';
import TempAbsent from '../pages/TempAbsent/TempAbsent';
import AddTempAbsent from '../pages/TempAbsent/AddTempAbsent/AddTempAbsent';
import Stay from '../pages/Stay/Stay';
import AddStay from '../pages/Stay/AddStay/AddStay';
import Death from '../pages/Death/Death';
import AddDeath from '../pages/Death/AddDeath/AddDeath';
import AddUser from '../pages/Admin/AddUser/AddUser';

const SideNavRoutes = () => {
    return (
        <Switch>
            <PrivateRoute path='/account' exact component={Account}/>
            
            <RoleRoute path='/users/list' exact component={Admin} role='admin'/>
            <RoleRoute path='/users/add' exact component={AddUser} role='admin'/>
            
            <RoleRoute path='/people/list' exact component={People} role='manager'/>
            <RoleRoute path='/people/add' exact component={AddPerson} role='manager'/>
            <RoleRoute path='/people/:id' exact component={PersonDetail} role='manager'/>
            
            <RoleRoute path='/tempAbsents/list' exact component={TempAbsent} role='manager'/>
            <RoleRoute path='/tempAbsents/add' exact component={AddTempAbsent} role='manager'/>
            
            <RoleRoute path='/stays/list' exact component={Stay} role='manager'/>
            <RoleRoute path='/stays/add' exact component={AddStay} role='manager'/>
            
            <RoleRoute path='/deaths/list' exact component={Death} role='manager'/>
            <RoleRoute path='/deaths/add' exact component={AddDeath} role='manager'/>
            
            <Redirect to='/account'/>
        </Switch>
    );
};

export default SideNavRoutes;
