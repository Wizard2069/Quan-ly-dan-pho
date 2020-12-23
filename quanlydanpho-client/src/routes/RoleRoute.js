import React from 'react';
import {Redirect, Route} from 'react-router-dom';

import {getRoles} from '../utils/utils';

const RoleRoute = ({component: Component, role, ...rest}) => {
    const roles = getRoles();
    
    return (
        <Route {...rest} render={props => (
            roles.includes(role, 0)
                ? <Component {...props}/>
                : <Redirect to='/account'/>
        )}/>
    );
};

export default RoleRoute;
