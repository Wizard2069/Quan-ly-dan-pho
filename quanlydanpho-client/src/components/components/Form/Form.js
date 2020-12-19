import React from 'react';
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBContainer,
  MDBAvatar,
  MDBIcon,
  MDBBtn
} from 'mdbreact';
import './Form.css';

const PV1 = () => {
  return (
    <div id='profile-v1' className='mb-5'>
      <MDBContainer fluid className='mb-5'>
        <section className='section team-section mb-5'>
          <MDBRow center className='text-center'>
            <MDBCol md='8' className='mb-r'>
              <MDBCard cascade className='cascading-admin-card user-card'>
                <div className='admin-up d-flex justify-content-start'>
                  <MDBIcon icon='users' className='info-color py-4 z-depth-2' />{' '}
                  <div className='data'>
                    <h5 className='font-weight-bold dark-grey-text'>
                      Edit Profile -{' '}
                      <span className='text-muted'>Complete your profile</span>
                    </h5>
                  </div>
                </div>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol lg='4'>
                      <MDBInput type='text' label='Username' />
                    </MDBCol>
                    <MDBCol lg='4'>
                      <MDBInput type='text' label='Email adress' />
                    </MDBCol>
                    <MDBCol lg='4'>
                      <MDBInput type='text' label='Company' />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md='6'>
                      <MDBInput type='text' label='First name' />
                    </MDBCol>
                    <MDBCol md='6'>
                      <MDBInput type='text' label='Last name' />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md='12'>
                      <MDBInput type='text' label='Address' />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol lg='4' md='12'>
                      <MDBInput type='text' label='City' />
                    </MDBCol>
                    <MDBCol lg='4' md='6'>
                      <MDBInput type='text' label='Country' />
                    </MDBCol>
                    <MDBCol lg='4' md='6'>
                      <MDBInput type='text' label='Postal code' />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md='12' className='about-text'>
                      <h4 className='text-muted text-left my-4'>
                        <strong>About me</strong>
                      </h4>
                      <MDBInput type='textarea' label="Don't be shy..." />
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </section>
      </MDBContainer>
    </div>
  );
};

export default PV1;
