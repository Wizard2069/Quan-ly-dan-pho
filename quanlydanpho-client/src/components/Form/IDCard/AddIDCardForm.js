import React, {useState} from 'react';
import {MDBBtn, MDBCol, MDBRow} from 'mdbreact';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

import DatePicker from '../../DatePicker/DatePicker';
import Input from '../../Input/Input';
import {fieldsToVietnamese} from '../../../utils/fieldUtils';
import {createIdCardByPersonId} from '../../../store/actions/idCard';
import {toVnISOString} from '../../../utils/utils';

const AddIDCardForm = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    
    const [idCardDto, setIdCardDto] = useState({});
    
    const validationSchema = yup.object({
        idCardNumber: yup.string()
            .required('idCardNumber is required'),
        issuedPlace: yup.string()
            .required('issuedPlace is required')
    });
    
    const formik = useFormik({
        initialValues: {
            idCardNumber: '',
            issuedPlace: ''
        },
        validationSchema,
        onSubmit: (values) => {
            const idCardBody = {
                ...idCardDto,
                ...values
            };
            dispatch(createIdCardByPersonId(props.personId, idCardBody));
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
    
    const onGetDateValue = (value) => {
        setIdCardDto(prevIdCardDto => {
            return {
                ...prevIdCardDto,
                issuedDay: toVnISOString(value)
            };
        });
    };
    
    return (
        <form
            className='needs-validation'
            onSubmit={formik.handleSubmit}
            noValidate
            style={{backgroundPosition: 'none'}}
        >
            <MDBRow>
                {colInputs[0]}
                {colInputs[1]}
                <MDBCol md='3' style={{marginTop: '7px'}}>
                    <small className='grey-text'>Ngày cấp</small>
                    <DatePicker keyboard getPickerValue={onGetDateValue}/>
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol className='text-right'>
                    <MDBBtn color='danger' onClick={props.handleCancelAdd}>
                        Huỷ
                    </MDBBtn>
                    <MDBBtn color='primary' type='submit'>
                        Thêm
                    </MDBBtn>
                </MDBCol>
            </MDBRow>
        </form>
    );
};

export default AddIDCardForm;
