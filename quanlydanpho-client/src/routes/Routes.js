import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import RoutesWithNavigation from './RoutesWithNavigation';
import AuthRoutes from './Auth/AuthRoutes';

const Routes = () => {
    return (
        <>
            <Switch>
                <Route exact path={['/login', '/forgot']}>
                    <AuthRoutes/>
                </Route>
                <RoutesWithNavigation/>
                <Redirect to='/login'/>
            </Switch>
        </>
    );
};

export default Routes;
