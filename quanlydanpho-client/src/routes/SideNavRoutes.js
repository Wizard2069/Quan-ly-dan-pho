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
import Household from '../pages/Household/Household';
import AddHousehold from '../pages/Household/AddHousehold/AddHousehold';
import HouseholdDetail from '../pages/Household/HouseholdDetail/HouseholdDetail';
import Petition from '../pages/Petition/Petition';
import AddPetition from '../pages/Petition/AddPetition/AddPetition';
import SinglePetitionDetail from '../pages/Petition/PetitionDetail/SinglePetitionDetail';
import Reply from '../pages/Reply/Reply';
import SingleReplyDetail from '../pages/Reply/ReplyDetail/SingleReplyDetail';

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
            
            <RoleRoute path='/households/list' exact component={Household} role='manager'/>
            <RoleRoute path='/households/add' exact component={AddHousehold} role='manager'/>
            <RoleRoute path='/households/:id' exact component={HouseholdDetail} role='manager'/>
            
            <PrivateRoute path='/petitions/list' exact component={Petition}/>
            <RoleRoute path='/petitions/add' exact component={AddPetition} role='user'/>
            <PrivateRoute path='/petitions/:id' exact component={SinglePetitionDetail}/>
            
            <PrivateRoute path='/replies/list' exact component={Reply}/>
            <PrivateRoute path='/replies/:id' exact component={SingleReplyDetail}/>
        
            <Redirect to='/account'/>
        </Switch>
    );
};

export default SideNavRoutes;
