import React, {useState} from 'react';
import {getUser, toVnISOString} from '../../../utils/utils';
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
    MDBRow,
    MDBInput
} from 'mdbreact';

import '../Form.css';
import {fieldsToVietnamese} from '../../../utils/fieldUtils';
import Input from '../../Input/Input';
import DatePicker from '../../DatePicker/DatePicker';
import HostModal from '../../Modal/Household/HostModal';
import {createNewHousehold} from '../../../store/actions/households';

const HouseholdForm = () => {
    const user = getUser();
    
    const history = useHistory();
    const dispatch = useDispatch();
    
    const [modal, setModal] = useState(false);
    
    const [name, setName] = useState(null);
    
    const [householdDto, setHouseholdDto] = useState({
        performerName: user.username
    });
    
    const validationSchema = yup.object({
        areaCode: yup.string()
            .required('areaCode is required'),
        address: yup.string()
            .required('address is required')
    });
    
    const formik = useFormik({
        initialValues: {
            areaCode: '',
            address: ''
        },
        validationSchema,
        onSubmit: (values) => {
            const householdBody = {
                ...householdDto,
                ...values
            };
            dispatch(createNewHousehold(householdBody));
            history.push('/households/list');
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
    
    const toggle = () => {
        setModal(prevModal => !prevModal);
    };
    
    const getCreatedDateValue = (value) => {
        setHouseholdDto(prevHouseholdDto => {
            return {
                ...prevHouseholdDto,
                createdDay: toVnISOString(value)
            };
        });
    };
    
    const handleOnGetHost = (id, name) => {
        setHouseholdDto(prevHouseholdDto => {
            return {
                ...prevHouseholdDto,
                hostPersonId: id
            };
        });
        setName(name);
        toggle();
    };
    
    return (
        <section>
            <MDBCard narrow className='mb-5'>
                <MDBCardImage
                    className='view view-cascade gradient-card-header blue-gradient'
                    cascade
                    tag='div'
                >
                    <h2 className='h2-responsive mb-2'>Thêm hộ khẩu</h2>
                </MDBCardImage>
                <MDBCardBody cascade>
                    <form
                        className='needs-validation'
                        onSubmit={formik.handleSubmit}
                        noValidate
                        style={{backgroundPosition: 'none'}}
                    >
                        <MDBRow>
                            <MDBCol md='4'>
                                <MDBInput
                                    disabled
                                    outline
                                    label='Chủ hộ'
                                    icon='user'
                                    onIconClick={toggle}
                                    value={name ?? ''}
                                />
                            </MDBCol>
                            <HostModal
                                modal={modal}
                                toggle={toggle}
                                handleOnDone={(id, name) => handleOnGetHost(id, name)}
                            />
                            {colInputs}
                            <MDBCol md='3' style={{marginTop: '7px', marginLeft: '2rem'}}>
                                <small className='grey-text'>Ngày lập</small>
                                <DatePicker keyboard getPickerValue={getCreatedDateValue}/>
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

export default React.memo(HouseholdForm);
