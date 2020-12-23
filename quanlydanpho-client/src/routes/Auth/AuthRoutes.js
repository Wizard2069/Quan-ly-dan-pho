import React from 'react';
import {MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBMask, MDBRow, MDBView} from 'mdbreact';
import {Route, Switch} from 'react-router-dom';
import './AuthRoutes.css';

import Login from '../../pages/Login/Login';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';

const AuthRoutes = () => {
    return (
        <div className='classic-form-page' id='background'>
            <MDBView>
                <MDBMask
                    className='d-flex justify-content-center align-items-center'
                    overlay='stylish-strong'
                >
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol md='10' lg='6' xl='5' sm='12' className='mt-5 mx-auto'>
                                <MDBCard>
                                    <MDBCardBody>
                                        <Switch>
                                            <Route path='/login' exact component={Login}/>
                                            <Route path='/forgot' exact component={ForgotPassword}/>
                                        </Switch>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </MDBMask>
            </MDBView>
        </div>
    );
};

export default AuthRoutes;
