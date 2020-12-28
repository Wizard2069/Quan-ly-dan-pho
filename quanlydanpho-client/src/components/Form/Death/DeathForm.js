import React, {useState} from 'react';
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
import {getUser, toVnISOString} from '../../../utils/utils';
import Input from '../../Input/Input';
import DatePicker from '../../DatePicker/DatePicker';
import {createNewDeath} from '../../../store/actions/deaths';

const DeathForm = () => {
    const user = getUser();
    
    const history = useHistory();
    const dispatch = useDispatch();
    
    const [deathDto, setDeathDto] = useState({
        deletedManagerUsername: user.username
    });
    
    const validationSchema = yup.object({
        deathCertNumber: yup.string()
            .required('deathCertNumber is required'),
        declaredPersonIdCardNumber: yup.string()
            .required('declaredPersonIdCardNumber is required'),
        deathPersonCode: yup.string()
            .required('deathPersonCode is required')
    });
    
    const formik = useFormik({
        initialValues: {
            deathCertNumber: '',
            declaredPersonIdCardNumber: '',
            deathPersonCode: '',
            deathReason: ''
        },
        validationSchema,
        onSubmit: (values) => {
            const deathBody = {
                ...deathDto,
                ...values
            };
            dispatch(createNewDeath(deathBody));
            history.push('/deaths/list');
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
    
    const getDeclaredDateValue = (value) => {
        setDeathDto(prevDeathDto => {
            return {
                ...prevDeathDto,
                declaredDay: toVnISOString(value)
            };
        });
    };
    
    const getDeathDateValue = (value) => {
        setDeathDto(prevDeathDto => {
            return {
                ...prevDeathDto,
                deathDay: toVnISOString(value)
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
                    <h2 className='h2-responsive mb-2'>Thêm khai tử</h2>
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
                            <MDBCol md='4' style={{marginTop: '7px'}}>
                                <small className='grey-text'>Ngày khai</small>
                                <DatePicker keyboard getPickerValue={getDeclaredDateValue}/>
                            </MDBCol>
                            <MDBCol md='4' style={{marginTop: '7px'}}>
                                <small className='grey-text'>Ngày chết</small>
                                <DatePicker keyboard getPickerValue={getDeathDateValue}/>
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

export default React.memo(DeathForm);
