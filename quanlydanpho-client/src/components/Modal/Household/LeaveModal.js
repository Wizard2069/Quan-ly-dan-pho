import React, {useState} from 'react';
import {
    MDBBtn, MDBCol,
    MDBModal,
    MDBModalBody,
    MDBModalFooter,
    MDBModalHeader, MDBRow
} from 'mdbreact';
import {useDispatch} from 'react-redux';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {useHistory} from 'react-router-dom';

import Input from '../../Input/Input';
import {fieldsToVietnamese} from '../../../utils/fieldUtils';
import DatePicker from '../../DatePicker/DatePicker';
import {getUser, toVnISOString} from '../../../utils/utils';
import {leaveHouseholdById} from '../../../store/actions/households';

const LeaveModal = (props) => {
    const user = getUser();
    
    const history = useHistory();
    const dispatch = useDispatch();
    
    const [leaveDto, setLeaveDto] = useState({
        performerName: user.username
    });
    
    const validationSchema = yup.object({
        newAddress: yup.string()
            .required('newAddress is required')
    });
    
    const formik = useFormik({
        initialValues: {
            leaveReason: '',
            newAddress: ''
        },
        validationSchema,
        onSubmit: (values) => {
            const leaveBody = {
                ...leaveDto,
                ...values
            };
            dispatch(leaveHouseholdById(props.householdId, leaveBody));
            history.go(0);
        }
    });
    
    let colInputs = [];
    for (const key in formik.values) {
        if (formik.values.hasOwnProperty(key)) {
            colInputs.push(
                <Input
                    key={key}
                    handleChange={formik.handleChange}
                    name={key}
                    label={fieldsToVietnamese(key)}
                    className={formik.touched[key] ? (formik.errors[key] ? 'is-invalid' : 'is-valid') : null}
                    value={formik.values[key]}
                />
            );
        }
    }
    
    const onGetLeaveDateValue = (value) => {
        setLeaveDto(prevLeaveDto => {
            return {
                ...prevLeaveDto,
                leaveDate: toVnISOString(value)
            };
        });
    };
    
    const handleOnClose = () => {
        props.toggle();
        formik.resetForm();
    };
    
    const handleOnDone = (e) => {
        formik.handleSubmit(e);
    };
    
    return (
        <MDBModal centered size='lg' isOpen={props.modal} toggle={handleOnClose}>
            <MDBModalHeader toggle={handleOnClose}>Chuyển đi</MDBModalHeader>
            <MDBModalBody>
                <form>
                    <MDBRow>
                        <MDBCol md='4' style={{marginTop: '7px'}}>
                            <small className='grey-text'>Ngày chuyển đi</small>
                            <DatePicker keyboard getPickerValue={onGetLeaveDateValue}/>
                        </MDBCol>
                        {colInputs}
                    </MDBRow>
                </form>
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color="secondary" onClick={handleOnClose}>Đóng</MDBBtn>
                <MDBBtn color="primary" onClick={handleOnDone}>Xong</MDBBtn>
            </MDBModalFooter>
        </MDBModal>
    );
};

export default LeaveModal;
