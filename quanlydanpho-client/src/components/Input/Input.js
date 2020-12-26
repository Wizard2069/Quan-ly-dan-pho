import React from 'react';
import {MDBCol, MDBInput} from 'mdbreact';

const Input = (props) => {
    return (
        <MDBCol md='4'>
            <MDBInput
                outline
                onChange={props.handleChange}
                type='text'
                name={props.name}
                label={props.label}
                className={props.className}
            >
                <div className='invalid-feedback ml-4 pl-3'>
                    * Bắt buộc
                </div>
            </MDBInput>
        </MDBCol>
    );
};

export default Input;
