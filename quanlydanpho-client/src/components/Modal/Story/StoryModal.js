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
import {toVnISOString} from '../../../utils/utils';
import {createStoryByPersonId} from '../../../store/actions/stories';

const StoryModal = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    
    const [storyDto, setStoryDto] = useState({});
    
    const validationSchema = yup.object({
        address: yup.string()
            .required('address is required'),
        job: yup.string()
            .required('job is required'),
        workplace: yup.string()
            .required('workplace is required')
    });
    
    const formik = useFormik({
        initialValues: {
            address: '',
            job: '',
            workplace: ''
        },
        validationSchema,
        onSubmit: (values) => {
            const storyBody = {
                ...storyDto,
                ...values
            };
            dispatch(createStoryByPersonId(props.personId, storyBody));
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
    
    const onGetDateFromValue = (value) => {
        setStoryDto(prevStoryDto => {
            return {
                ...prevStoryDto,
                fromDate: toVnISOString(value)
            };
        });
    };
    
    const onGetDateToValue = (value) => {
        setStoryDto(prevStoryDto => {
            return {
                ...prevStoryDto,
                toDate: toVnISOString(value)
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
            <MDBModalHeader toggle={handleOnClose}>Thêm tiểu sử</MDBModalHeader>
            <MDBModalBody>
                <form>
                    <MDBRow>
                        <MDBCol md='4' style={{marginTop: '7px'}}>
                            <small className='grey-text'>Từ ngày</small>
                            <DatePicker keyboard getPickerValue={onGetDateFromValue}/>
                        </MDBCol>
                        <MDBCol md='4' style={{marginTop: '7px'}}>
                            <small className='grey-text'>Đến ngày</small>
                            <DatePicker keyboard getPickerValue={onGetDateToValue}/>
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

export default StoryModal;
