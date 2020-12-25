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

import DatePicker from '../../components/DatePicker/DatePicker';
import {createPerson} from '../../store/actions/people';
import {getUser} from '../../utils/utils';

const AddPerson = () => {
    const user = getUser();
    
    const history = useHistory();
    const person = useSelector(state => state.people);
    const dispatch = useDispatch();
    
    const [personDto, setPersonDto] = useState({
        createdManagerUsername: user.username,
        createdDate: new Date().toISOString()
    });
    
    const submitHandler = (e) => {
        e.preventDefault();
        e.target.className = ' was-validated';
    };
    
    const changeHandler = (e) => {
        const {name, value} = e.target;
        
        setPersonDto(prevPersonDto => {
            return {
                ...prevPersonDto,
                [name]: value
            };
        });
    };
    
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
                        onSubmit={submitHandler}
                        noValidate
                        style={{backgroundPosition: 'none'}}
                    >
                        <MDBRow>
                            <MDBCol md='4'>
                                <MDBInput
                                    outline
                                    onChange={changeHandler}
                                    type='text'
                                    name='fullName'
                                    label='Họ và tên'
                                    required
                                >
                                    <div className='invalid-feedback ml-4 pl-3'>
                                        * Bắt buộc
                                    </div>
                                </MDBInput>
                            </MDBCol>
                            <MDBCol md='4'>
                                <MDBInput
                                    outline
                                    onChange={changeHandler}
                                    type='text'
                                    name='alias'
                                    label='Biệt danh'
                                />
                            </MDBCol>
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
                            <MDBCol md='4'>
                                <MDBInput
                                    outline
                                    onChange={changeHandler}
                                    type='text'
                                    name='birthPlace'
                                    label='Nơi sinh'
                                    required
                                >
                                    <div className='invalid-feedback ml-4 pl-3'>
                                        * Bắt buộc
                                    </div>
                                </MDBInput>
                            </MDBCol>
                            <MDBCol md='4'>
                                <MDBInput
                                    outline
                                    onChange={changeHandler}
                                    type='text'
                                    name='domicile'
                                    label='Nguyên quán'
                                    required
                                >
                                    <div className='invalid-feedback ml-4 pl-3'>
                                        * Bắt buộc
                                    </div>
                                </MDBInput>
                            </MDBCol>
                            <MDBCol md='4'>
                                <MDBInput
                                    outline
                                    onChange={changeHandler}
                                    type='text'
                                    name='religion'
                                    label='Dân tộc'
                                    required
                                >
                                    <div className='invalid-feedback ml-4 pl-3'>
                                        * Bắt buộc
                                    </div>
                                </MDBInput>
                            </MDBCol>
                            <MDBCol md='4'>
                                <MDBInput
                                    outline
                                    onChange={changeHandler}
                                    type='text'
                                    name='nationality'
                                    label='Tôn giáo'
                                    required
                                >
                                    <div className='invalid-feedback ml-4 pl-3'>
                                        * Bắt buộc
                                    </div>
                                </MDBInput>
                            </MDBCol>
                            <MDBCol md='4'>
                                <MDBInput
                                    outline
                                    onChange={changeHandler}
                                    type='text'
                                    name='nationality'
                                    label='Quốc tịch'
                                    required
                                >
                                    <div className='invalid-feedback ml-4 pl-3'>
                                        * Bắt buộc
                                    </div>
                                </MDBInput>
                            </MDBCol>
                            <MDBCol md='4'>
                                <MDBInput
                                    outline
                                    onChange={changeHandler}
                                    type='text'
                                    name='passportNumber'
                                    label='Số hộ chiếu'
                                />
                            </MDBCol>
                            <MDBCol md='4'>
                                <MDBInput
                                    outline
                                    onChange={changeHandler}
                                    type='text'
                                    name='permanentAddress'
                                    label='Nơi thường trú'
                                    required
                                >
                                    <div className='invalid-feedback ml-4 pl-3'>
                                        * Bắt buộc
                                    </div>
                                </MDBInput>
                            </MDBCol>
                            <MDBCol md='4'>
                                <MDBInput
                                    outline
                                    onChange={changeHandler}
                                    type='text'
                                    name='currentAddress'
                                    label='Địa chỉ hiện tại'
                                    required
                                >
                                    <div className='invalid-feedback ml-4 pl-3'>
                                        * Bắt buộc
                                    </div>
                                </MDBInput>
                            </MDBCol>
                            <MDBCol md='4'>
                                <MDBInput
                                    outline
                                    onChange={changeHandler}
                                    type='text'
                                    name='academicLevel'
                                    label='Trình độ học vấn'
                                />
                            </MDBCol>
                            <MDBCol md='4'>
                                <MDBInput
                                    outline
                                    onChange={changeHandler}
                                    type='text'
                                    name='qualification'
                                    label='Trình độ chuyên môn'
                                />
                            </MDBCol>
                            <MDBCol md='4'>
                                <MDBInput
                                    outline
                                    onChange={changeHandler}
                                    type='text'
                                    name='ethnicLanguage'
                                    label='Biết tiếng dân tộc'
                                />
                            </MDBCol>
                            <MDBCol md='4'>
                                <MDBInput
                                    outline
                                    onChange={changeHandler}
                                    type='text'
                                    name='languageLevel'
                                    label='Trình độ ngoại ngữ'
                                />
                            </MDBCol>
                            <MDBCol md='4'>
                                <MDBInput
                                    outline
                                    onChange={changeHandler}
                                    type='text'
                                    name='job'
                                    label='Nghề nghiệp'
                                />
                            </MDBCol>
                            <MDBCol md='4'>
                                <MDBInput
                                    outline
                                    onChange={changeHandler}
                                    type='text'
                                    name='workplace'
                                    label='Nơi làm việc'
                                />
                            </MDBCol>
                            <MDBCol md='4'>
                                <MDBInput
                                    outline
                                    onChange={changeHandler}
                                    type='text'
                                    name='criminalRecord'
                                    label='Tiền Án'
                                />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <MDBInput
                                    outline
                                    onChange={changeHandler}
                                    type='textarea'
                                    name='note'
                                    label='Ghi chú'
                                    rows="5"
                                    icon="pencil-alt"
                                />
                            </MDBCol>
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

export default AddPerson;
