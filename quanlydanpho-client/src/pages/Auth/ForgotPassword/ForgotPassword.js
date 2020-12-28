import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {MDBBtn, MDBInput, MDBNotification} from 'mdbreact';

import {clearSent, sendMail} from '../../../store/actions/auth';

const ForgotPassword = () => {
    const history = useHistory();
    let sent = useSelector(state => state.user.sent);
    const dispatch = useDispatch();
    
    const [email, setEmail] = useState('');
    
    const handleReturnSubmit = (e) => {
        e.preventDefault();
        history.push('/login');
    };
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    
    const handleResetSubmit = (e) => {
        e.preventDefault();
        dispatch(sendMail(email));
    };
    
    let notification = null;
    
    useEffect(() => {
        return () => {
            dispatch(clearSent());
        };
    }, [dispatch]);
    
    if (sent) {
        notification = (
            <MDBNotification
                autohide={3000}
                show
                fade
                iconClassName="text-primary"
                title="Thông báo"
                message="Gửi email thành công"
                text="Vừa xong"
                style={{
                    width: "300px",
                    position: "fixed",
                    top: "10px",
                    right: "10px",
                    zIndex: 9999
                }}
            />
        );
    }
    
    return (
        <>
            {notification}
            <MDBInput
                type='email'
                label='Email'
                icon='envelope'
                iconClass='white-text'
                onChange={handleEmailChange}
            />
            <div className='text-center mt-3 black-text'>
                <MDBBtn
                    className='white-gradient'
                    size='lg'
                    type='submit'
                    onClick={handleReturnSubmit}
                >
                    Đi đến đăng nhập
                </MDBBtn>
                <MDBBtn
                    className='white-gradient'
                    size='lg'
                    type='submit'
                    onClick={handleResetSubmit}
                >
                    Reset
                </MDBBtn>
            </div>
        </>
    );
};

export default React.memo(ForgotPassword);
