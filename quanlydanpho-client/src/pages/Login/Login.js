import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {MDBInput, MDBIcon, MDBBtn} from 'mdbreact';

import {login} from '../../store/actions/auth';

const Login = () => {
    const history = useHistory();
    const isAuth = useSelector(state => state.user.authenticated);
    const err = useSelector(state => state.error);
    const dispatch = useDispatch();
    
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    
    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    };
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(username, password));
    };
    
    const handleForgotSubmit = (e) => {
        e.preventDefault();
        history.push('/forgot');
    };
    
    useEffect(() => {
        if (err) {
            console.log(err);
        }
        
        if (isAuth) {
            history.push('/account');
        }
    }, [isAuth, err]);
    
    return (
        <>
            <div className='form-header purple-gradient'>
                <h3>
                    <MDBIcon
                        icon='user'
                        className='mt-2 mb-2 text-white'
                    />{' '}
                    Xin chào
                </h3>
            </div>
            <MDBInput
                type='email'
                label='Email'
                icon='envelope'
                iconClass='white-text'
                onChange={handleUserNameChange}
            />
            <MDBInput
                type='password'
                label='Mật khẩu'
                icon='lock'
                iconClass='white-text'
                onChange={handlePasswordChange}
            />
            <div className='text-center mt-3 black-text'>
                <MDBBtn
                    className='white-gradient'
                    size='lg'
                    onClick={handleForgotSubmit}
                >
                    Quên mật khẩu ?
                </MDBBtn>
                <MDBBtn
                    className='white-gradient'
                    size='lg'
                    type='submit'
                    onClick={handleLoginSubmit}
                >
                    Đăng nhập
                </MDBBtn>
                <hr/>
            </div>
        </>
    );
};

export default React.memo(Login);
