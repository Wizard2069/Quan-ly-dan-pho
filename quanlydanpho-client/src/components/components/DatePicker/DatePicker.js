import React from 'react';
import { MDBDatePicker } from 'mdbreact';

class DatePickerPage extends React.Component  {
    getPickerValue = (value) => {
        console.log(value);
    };

    render() {
        return(
            <MDBDatePicker getValue={this.getPickerValue} className='my-0 d-inline ml-3' />
        );
    }
};

export default DatePickerPage;