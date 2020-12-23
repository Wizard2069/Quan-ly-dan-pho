import React from 'react';
import {MDBDatePicker} from 'mdbreact';
import moment from 'moment';
import 'moment/locale/vi';

const DatePicker = (props) => {
    return (
        <MDBDatePicker
            className='my-0 d-inline ml-3'
            getValue={props.getPickerValue}
            locale={moment.locale('vi')}
            autoOk={true}
        />
    );
};

export default DatePicker;
