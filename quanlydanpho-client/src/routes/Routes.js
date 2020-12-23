import React from 'react';
import {Route, Switch} from 'react-router-dom';

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
            </Switch>
        </>
    );
};

export default Routes;
