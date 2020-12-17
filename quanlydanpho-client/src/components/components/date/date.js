import React from 'react';
import { MDBDatePicker } from 'mdbreact';

class DatePickerPage extends React.Component  {
    getPickerValue = (value) => {
        console.log(value);
    }

    render() {
        return(
            <div>
                <MDBDatePicker getValue={this.getPickerValue} />
            </div>
        );
    }
};

export default DatePickerPage;