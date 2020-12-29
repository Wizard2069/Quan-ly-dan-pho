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
    MDBRow,
    MDBInput
} from 'mdbreact';

import '../Form.css';
import {fieldsToVietnamese} from '../../../utils/fieldUtils';
import Input from '../../Input/Input';
import DatePicker from '../../DatePicker/DatePicker';
import HostModal from '../../Modal/Household/Host/HostModal';

const HouseholdForm = (props) => {
    const user = getUser();
    
    const location = useLocation();
    
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
            ...props.initialValues
        },
        validationSchema,
        onSubmit: (values) => {
            const householdBody = {
                ...householdDto,
                ...values
            };
            props.onHandleSubmit(householdBody);
        }
    });
    
    let colInputs = [];
    for (const key in formik.values) {
        if (formik.values.hasOwnProperty(key)) {
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
                    <MDBRow>
                        <MDBCol md='4' className='offset-md-4 d-flex justify-content-center align-items-center'>
                            <h2 className='h2-responsive mb-0'>{props.title}</h2>
                        </MDBCol>
                        {location.pathname.match(/\/households\/[0-9]+/) && props.title !== 'Tách hộ' ?
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
                            <MDBCol md='4'>
                                {props.edit ?
                                    <MDBInput
                                        disabled
                                        outline
                                        label='Chủ hộ'
                                        icon='user'
                                        onIconClick={toggle}
                                        value={name ?? ''}
                                    /> :
                                    <MDBInput
                                        disabled
                                        outline
                                        label='Chủ hộ'
                                        value={props.host}
                                    />
                                }
                            </MDBCol>
                            <HostModal
                                modal={modal}
                                toggle={toggle}
                                handleOnDone={(id, name) => handleOnGetHost(id, name)}
                            />
                            {colInputs}
                            {props.edit ?
                                <MDBCol md='3' style={{marginTop: '7px', marginLeft: '2rem'}}>
                                    <small className='grey-text'>Ngày lập</small>
                                    <DatePicker keyboard getPickerValue={getCreatedDateValue}/>
                                </MDBCol> :
                                <Input
                                    disabled={true}
                                    name={props.date}
                                    label='Ngày lập'
                                    value={toVnDateFormat(props.date)}
                                />
                            }
                            {props.extraCols}
                        </MDBRow>
                        {props.edit ?
                            <MDBRow>
                                <MDBCol className='text-right'>
                                    <MDBBtn color='primary' type='submit'>
                                        Thêm
                                    </MDBBtn>
                                </MDBCol>
                            </MDBRow> : null
                        }
                    </form>
                </MDBCardBody>
            </MDBCard>
        </section>
    );
};

export default React.memo(HouseholdForm);
