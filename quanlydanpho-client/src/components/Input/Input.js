import React from 'react';
import {MDBCol, MDBInput} from 'mdbreact';

const Input = (props) => {
    return (
        <MDBCol md={props.md ?? '4'}>
            <MDBInput
                disabled={props.disabled}
                outline
                onChange={props.handleChange}
                type='text'
                name={props.name}
                label={props.label}
                className={props.className}
                value={props.value}
            >
                <div className='invalid-feedback ml-4 pl-3'>
                    * Bắt buộc
                </div>
            </MDBInput>
        </MDBCol>
    );
};

export default Input;
