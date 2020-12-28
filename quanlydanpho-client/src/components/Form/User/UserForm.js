import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBRow, MDBSelect, MDBSelectInput, MDBSelectOption, MDBSelectOptions
} from 'mdbreact';

import '../Form.css';
import {fieldsToVietnamese} from '../../../utils/fieldUtils';
import Input from '../../Input/Input';
import {createNewUser} from '../../../store/actions/users';

const UserForm = () => {
    const history = useHistory();
    const userData = useSelector(state => state.singleUser);
    const dispatch = useDispatch();
    
    const [userDto, setUserDto] = useState({});
    
    const validationSchema = yup.object({
        username: yup.string()
            .required('username is required'),
        email: yup.string()
            .email('must be email')
            .required('email is required'),
        password: yup.string()
            .required('password is required')
    });
    
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: (values) => {
            const userBody = {
                ...userDto,
                ...values
            };
            dispatch(createNewUser(userBody));
        }
    });
    
    useEffect(() => {
        if (userData.id) {
            history.push('/users/list');
            history.go(0);
        }
    }, [userData.id]);
    
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
    
    const onGetRoleValue = (value) => {
        setUserDto(prevUserDto => {
            return {
                ...prevUserDto,
                roles: value.join('')
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
                    <h2 className='h2-responsive mb-2'>Thêm người dùng</h2>
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
                            <MDBCol md='4'>
                                <MDBSelect
                                    className='colorful-select dropdown-primary mx-2'
                                    getValue={onGetRoleValue}
                                >
                                    <MDBSelectInput selected='Quyền'/>
                                    <MDBSelectOptions>
                                        <MDBSelectOption disabled>Quyền</MDBSelectOption>
                                        <MDBSelectOption value='1'>Chủ tịch</MDBSelectOption>
                                        <MDBSelectOption value='2'>Tổ trưởng</MDBSelectOption>
                                        <MDBSelectOption value='3'>Người dân</MDBSelectOption>
                                    </MDBSelectOptions>
                                </MDBSelect>
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

export default React.memo(UserForm);
