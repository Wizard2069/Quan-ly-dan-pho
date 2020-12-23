import React from 'react';
import {MDBSelect, MDBSelectInput, MDBSelectOption, MDBSelectOptions} from 'mdbreact';

const Select = (props) => {
    return (
        <MDBSelect
            className='colorful-select w-10 float-left dropdown-primary mt-2 hidden-md-down'
            getValue={props.onSelectChange}
        >
            <MDBSelectInput selected='Số dòng'/>
            <MDBSelectOptions>
                <MDBSelectOption disabled>Số dòng</MDBSelectOption>
                <MDBSelectOption value='5'>5 dòng</MDBSelectOption>
                <MDBSelectOption value='25'>25 dòng</MDBSelectOption>
                <MDBSelectOption value='75'>75 dòng</MDBSelectOption>
                <MDBSelectOption value='100'>100 dòng</MDBSelectOption>
            </MDBSelectOptions>
        </MDBSelect>
    );
};

export default Select;
