import React from 'react';
import { MDBRow, MDBCol, MDBIcon, MDBContainer, MDBBtn } from 'mdbreact';
import LinkCard from '../../LinkCard';

import './buttons.css';

const Buttons = () => {
    return (
        <MDBContainer fluid id='buttons'>
            <MDBBtn outline color='primary'>
                    Primary
            </MDBBtn>
                <MDBBtn outline color='primary'>
                    Primary
                </MDBBtn>
        </MDBContainer>
    );
};

export default Buttons;
