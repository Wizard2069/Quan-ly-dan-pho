import React, {useState} from 'react';
import {toVnISOString} from '../../../utils/utils';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBRow
} from 'mdbreact';

import '../Form.css';
import {fieldsToVietnamese} from '../../../utils/fieldUtils';
import Input from '../../Input/Input';
import DatePicker from '../../DatePicker/DatePicker';
import {createNewStay} from '../../../store/actions/stays';

const StayForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    
    const [stayDto, setTempAbsentDto] = useState({});
    
    const validationSchema = yup.object({
        idCardNumber: yup.string()
            .required('idCardNumber is required'),
        phoneNumber: yup.string()
            .required('phoneNumber is required')
    });
    
    const formik = useFormik({
        initialValues: {
            idCardNumber: '',
            phoneNumber: '',
            reason: ''
        },
        validationSchema,
        onSubmit: (values) => {
            const stayBody = {
                ...stayDto,
                ...values
            };
            dispatch(createNewStay(stayBody));
            history.push('/stays/list');
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
    
    const getDateFromValue = (value) => {
        setTempAbsentDto(prevStayDto => {
            return {
                ...prevStayDto,
                fromDate: toVnISOString(value)
            };
        });
    };
    
    const getDateToValue = (value) => {
        setTempAbsentDto(prevStayDto => {
            return {
                ...prevStayDto,
                toDate: toVnISOString(value)
            };
        });
    };
    
    return (
        <section>
            <MDBCard narrow className='mb-5'>
                <MDBCardImage
                    className='view view-cascade gradient-card-header blue-gradient'
                    cascade
                    tag='div'
                >
                    <h2 className='h2-responsive mb-2'>Thêm tạm trú</h2>
                </MDBCardImage>
                <MDBCardBody cascade>
                    <form
                        className='needs-validation'
                        onSubmit={formik.handleSubmit}
                        noValidate
                        style={{backgroundPosition: 'none'}}
                    >
                        <MDBRow>
                            {colInputs}
                            <MDBCol md='3' style={{marginTop: '7px'}}>
                                <small className='grey-text'>Từ ngày</small>
                                <DatePicker keyboard getPickerValue={getDateFromValue}/>
                            </MDBCol>
                            <MDBCol md='3' style={{marginTop: '7px'}} className='offset-md-1'>
                                <small className='grey-text'>Đến ngày</small>
                                <DatePicker keyboard getPickerValue={getDateToValue}/>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol className='text-right'>
                                <MDBBtn color='primary' type='submit'>
                                    Thêm
                                </MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </form>
                </MDBCardBody>
            </MDBCard>
        </section>
    );
};

export default React.memo(StayForm);
