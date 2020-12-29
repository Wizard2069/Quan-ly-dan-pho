import React, {useEffect, useState} from 'react';
import {
    MDBBtn, MDBCol,
    MDBModal,
    MDBModalBody,
    MDBModalFooter,
    MDBModalHeader, MDBRow, MDBSelect, MDBSelectInput, MDBSelectOption, MDBSelectOptions
} from 'mdbreact';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {useHistory} from 'react-router-dom';

import Input from '../../Input/Input';
import {fieldsToVietnamese} from '../../../utils/fieldUtils';
import DatePicker from '../../DatePicker/DatePicker';
import {getUser, toVnISOString} from '../../../utils/utils';
import {createCorrectionByHouseholdId} from '../../../store/actions/corrections';

const CorrectionModal = (props) => {
    const user = getUser();
    
    const history = useHistory();
    const correctionData = useSelector(state => state.correction);
    const dispatch = useDispatch();
    
    const [correctionDto, setCorrectionDto] = useState({
        performerName: user.username
    });
    
    const validationSchema = yup.object({
        changeFrom: yup.string()
            .required('changeFrom is required'),
        changeTo: yup.string()
            .required('changeTo is required')
    });
    
    const formik = useFormik({
        initialValues: {
            changeFrom: '',
            changeTo: ''
        },
        validationSchema,
        onSubmit: (values) => {
            const correctionBody = {
                ...correctionDto,
                ...values
            };
            dispatch(createCorrectionByHouseholdId(props.householdId, correctionBody));
        }
    });
    
    useEffect(() => {
        if (correctionData.id) {
            history.go(0);
        }
    }, [correctionData]);
    
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
    
    const onGetChangeInfoValue = (value) => {
        setCorrectionDto(prevCorrectionDto => {
            return {
                ...prevCorrectionDto,
                changeInfo: value.join('')
            };
        });
    };
    
    const onGetDateValue = (value) => {
        setCorrectionDto(prevCorrectionDto => {
            return {
                ...prevCorrectionDto,
                changeDate: toVnISOString(value)
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
            <MDBModalHeader toggle={handleOnClose}>Thêm đính chính</MDBModalHeader>
            <MDBModalBody>
                <form>
                    <MDBRow>
                        <MDBCol md='4' style={{marginTop: '7px'}}>
                            <small className='grey-text'>Ngày thay đổi</small>
                            <DatePicker keyboard getPickerValue={onGetDateValue}/>
                        </MDBCol>
                        <MDBCol md='4'>
                            <MDBSelect
                                className='colorful-select dropdown-primary mx-2'
                                getValue={onGetChangeInfoValue}
                            >
                                <MDBSelectInput selected='Nội dung thay đổi'/>
                                <MDBSelectOptions>
                                    <MDBSelectOption disabled>Nội dung thay đổi</MDBSelectOption>
                                    <MDBSelectOption value='HOST'>Chủ hộ</MDBSelectOption>
                                    <MDBSelectOption value='ADDRESS'>Địa chỉ</MDBSelectOption>
                                </MDBSelectOptions>
                            </MDBSelect>
                        </MDBCol>
                        {colInputs}
                    </MDBRow>
                </form>
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color="secondary" onClick={handleOnClose}>Đóng</MDBBtn>
                <MDBBtn color="primary" onClick={handleOnDone}>Thêm</MDBBtn>
            </MDBModalFooter>
        </MDBModal>
    );
};

export default CorrectionModal;
