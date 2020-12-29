import React, {useState} from 'react';
import {getUser, toVnDateFormat, toVnISOString} from '../../../utils/utils';
import {useLocation} from 'react-router-dom';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBInput,
    MDBRow,
    MDBSelect,
    MDBSelectInput, MDBSelectOption,
    MDBSelectOptions
} from 'mdbreact';

import '../Form.css';
import {fieldsToVietnamese} from '../../../utils/fieldUtils';
import Input from '../../Input/Input';
import DatePicker from '../../DatePicker/DatePicker';

const PersonForm = (props) => {
    const user = getUser();
    
    const location = useLocation();
    
    const [personDto, setPersonDto] = useState({
        createdManagerUsername: user.username,
        createdDate: toVnISOString(new Date())
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
            ...props.initialValues
        },
        validationSchema,
        onSubmit: (values) => {
            const personBody = {
                ...personDto,
                ...values
            };
            props.onHandleSubmit(personBody);
        }
    });
    
    let colInputs = [];
    for (const key in formik.values) {
        if (formik.values.hasOwnProperty(key)) {
            if (key === 'note') {
                colInputs.push(
                    <MDBCol key={key}>
                        <MDBInput
                            disabled={!props.edit}
                            outline
                            type='textarea'
                            rows='5'
                            onChange={formik.handleChange}
                            name={key}
                            label={fieldsToVietnamese(key)}
                            icon="pencil-alt"
                            className={formik.touched[key] ? (formik.errors[key] ? 'is-invalid' : 'is-valid') : null}
                            value={formik.values[key]}
                        />
                    </MDBCol>
                )
            } else {
                colInputs.push(
                    <Input
                        disabled={!props.edit}
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
    }
    
    const onGetDateValue = (value) => {
        setPersonDto(prevPersonDto => {
            return {
                ...prevPersonDto,
                birthday: toVnISOString(value)
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
    
    return (
        <section>
            <MDBCard narrow className='mb-5'>
                <MDBCardImage
                    className='view view-cascade gradient-card-header blue-gradient'
                    cascade
                    tag='div'
                >
                    <MDBRow>
                        <MDBCol md='4' className='offset-md-4 d-flex justify-content-center align-items-center'>
                            <h2 className='h2-responsive mb-0'>{props.title}</h2>
                        </MDBCol>
                        {location.pathname.match(/\/people\/[0-9]+/) ?
                            <MDBCol className='text-right'>
                                <MDBBtn color='blue accent-3' onClick={props.handleLeaveToggle}>
                                    Chuyển đi
                                </MDBBtn>
                            </MDBCol> : null
                        }
                    </MDBRow>
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
                            {props.edit ?
                                <MDBCol md='3' style={{marginTop: '7px'}}>
                                    <small className='grey-text'>Ngày sinh</small>
                                    <DatePicker date={props.date} keyboard getPickerValue={onGetDateValue}/>
                                </MDBCol> :
                                <Input
                                    disabled={true}
                                    name={props.date}
                                    label='Ngày sinh'
                                    value={toVnDateFormat(props.date)}
                                />
                            }
                            {props.edit ?
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
                                </MDBCol> :
                                <Input
                                    disabled={true}
                                    name={props.sex}
                                    label='Giới tính'
                                    value={props.sex}
                                />
                            }
                            {colInputs.slice(2, colInputs.length - 1)}
                            {props.extraCols}
                        </MDBRow>
                        <MDBRow>
                            {colInputs[colInputs.length - 1]}
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md='5' className='offset-md-7 text-right'>
                                {location.pathname.match(/\/people\/[0-9]+/) ?
                                    (props.edit ?
                                            <MDBBtn color='danger' onClick={props.onCancelClick}>
                                                Huỷ bỏ
                                            </MDBBtn> :
                                            <MDBBtn color='primary' onClick={props.onEditClick}>
                                                Chỉnh sửa
                                            </MDBBtn>
                                    )
                                    : null
                                }
                                {props.edit ?
                                    <MDBBtn color='primary' type='submit'>
                                        {props.btnTitle}
                                    </MDBBtn> : null
                                }
                            </MDBCol>
                        </MDBRow>
                    </form>
                </MDBCardBody>
            </MDBCard>
        </section>
    );
};

export default React.memo(PersonForm);
