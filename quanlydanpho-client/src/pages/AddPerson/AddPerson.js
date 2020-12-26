import React, {useEffect, useState} from 'react';
import {
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn,
    MDBSelect,
    MDBSelectOptions,
    MDBSelectInput,
    MDBSelectOption
} from 'mdbreact';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import * as yup from 'yup';

import DatePicker from '../../components/DatePicker/DatePicker';
import Input from '../../components/Input/Input';
import {createPerson} from '../../store/actions/people';
import {getUser} from '../../utils/utils';
import {fieldsToVietnamese} from '../../utils/fieldUtils';

import './AddPerson.css';

const AddPerson = () => {
    const user = getUser();
    
    const history = useHistory();
    const person = useSelector(state => state.people);
    const dispatch = useDispatch();
    
    const [personDto, setPersonDto] = useState({
        createdManagerUsername: user.username,
        createdDate: new Date().toISOString()
    });
    
    const validationSchema = yup.object({
        fullName: yup.string()
            .required('fullName is required'),
        birthPlace: yup.string()
            .required('birthPlace is required'),
        domicile: yup.string()
            .required('domicile is required'),
        nation: yup.string()
            .required('nation is required'),
        religion: yup.string()
            .required('religion is required'),
        nationality: yup.string()
            .required('nationality is required'),
        permanentAddress: yup.string()
            .required('permanentAddress is required'),
        currentAddress: yup.string()
            .required('currentAddress is required')
    });
    
    const formik = useFormik({
        initialValues: {
            fullName: '',
            alias: '',
            birthPlace: '',
            domicile: '',
            nation: '',
            religion: '',
            nationality: '',
            passportNumber: '',
            permanentAddress: '',
            currentAddress: '',
            academicLevel: '',
            qualification: '',
            ethnicLanguage: '',
            languageLevel: '',
            job: '',
            workplace: '',
            criminalRecord: '',
            note: ''
        },
        validationSchema,
        onSubmit: (values) => {
            const personBody = {
                ...personDto,
                ...values
            };
            dispatch(createPerson(personBody));
        }
    });
    
    let colInputs = [];
    for (const key in formik.values) {
        if (key === 'note') {
            colInputs.push(
                <MDBCol key={key}>
                    <MDBInput
                        outline
                        type='textarea'
                        rows='5'
                        onChange={formik.handleChange}
                        name={key}
                        label={fieldsToVietnamese(key)}
                        icon="pencil-alt"
                        className={formik.touched[key] ? (formik.errors[key] ? 'is-invalid' : 'is-valid') : null}
                    />
                </MDBCol>
            )
        } else {
            colInputs.push(
                <Input
                    key={key}
                    handleChange={formik.handleChange}
                    name={key}
                    label={fieldsToVietnamese(key)}
                    className={formik.touched[key] ? (formik.errors[key] ? 'is-invalid' : 'is-valid') : null}
                />
            );
        }
    }
    
    const onGetDateValue = (value) => {
        setPersonDto(prevPersonDto => {
            return {
                ...prevPersonDto,
                birthday: value.toISOString()
            };
        });
    };
    
    const onGetSexValue = (value) => {
        setPersonDto(prevPersonDto => {
            return {
                ...prevPersonDto,
                sex: value.join('')
            };
        });
    };
    
    useEffect(() => {
        if (person.id) {
            history.push('/people/list');
        }
    }, [person]);
    
    return (
        <section>
            <MDBCard narrow className='mb-5'>
                <MDBCardImage
                    className='view view-cascade gradient-card-header blue-gradient'
                    cascade
                    tag='div'
                >
                    <h2 className='h2-responsive mb-2'>Thêm nhân khẩu</h2>
                </MDBCardImage>
                <MDBCardBody cascade>
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
                                <small className='grey-text'>Ngày sinh</small>
                                <DatePicker keyboard getPickerValue={onGetDateValue}/>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md='4'>
                                <MDBSelect
                                    className='colorful-select dropdown-primary mx-2'
                                    getValue={onGetSexValue}
                                >
                                    <MDBSelectInput selected='Giới tính'/>
                                    <MDBSelectOptions>
                                        <MDBSelectOption disabled>Giới tính</MDBSelectOption>
                                        <MDBSelectOption value='male'>Nam</MDBSelectOption>
                                        <MDBSelectOption value='female'>Nữ</MDBSelectOption>
                                    </MDBSelectOptions>
                                </MDBSelect>
                            </MDBCol>
                            {colInputs.slice(2, colInputs.length - 1)}
                        </MDBRow>
                        <MDBRow>
                            {colInputs[colInputs.length - 1]}
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md='3' className='offset-md-5'>
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

export default React.memo(AddPerson);
