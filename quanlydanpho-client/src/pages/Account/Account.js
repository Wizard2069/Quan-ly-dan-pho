import React from 'react';
import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCardImage
} from 'mdbreact';
import {getUser} from '../../utils/utils';

const Account = () => {
    const user = getUser();
    
    return (
        <section>
            <MDBCard narrow className='mb-5'>
                <MDBCardImage
                    className='view view-cascade gradient-card-header blue-gradient'
                    cascade
                    tag='div'
                >
                    <h2 className='h2-responsive mb-2'>Information User</h2>
                </MDBCardImage>
                <MDBCardBody cascade>
                    <form>
                        <MDBRow>
                            <MDBCol md='5' className='offset-md-3'>
                                <MDBInput
                                    icon='envelope'
                                    value={user.email}
                                    disabled
                                    type='email'
                                    name='email'
                                    label='Your Email address'
                                />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md='5' className='offset-md-3'>
                                <MDBInput
                                    icon='user'
                                    value={user.username}
                                    disabled
                                    type='text'
                                    name='userName'
                                    label='Your username'
                                />
                            </MDBCol>
                        </MDBRow>
                    </form>
                </MDBCardBody>
            </MDBCard>
        </section>
    );
}

export default Account;
