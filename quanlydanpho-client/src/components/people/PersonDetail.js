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

import DatePicker from '../components/DatePicker/DatePicker';

const PersonDetail = () => {
    const submitHandler = (e) => {
        e.preventDefault();
        e.target.className = ' was-validated';
    };
    const changeHandler = (e) => {
        const {name, value} = e.target;
    };
    const onGetDateValue = (value) => {

    };

    const onGetSexValue = (value) => {

    };

    return (
        <section>
            <MDBCard narrow className='mb-5'>
                <MDBCardImage
                    className='view view-cascade gradient-card-header blue-gradient'
                    cascade
                    tag='div'
                >
                    <h2 className='h2-responsive mb-2'>Chi tiết nhân khẩu</h2>
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
                            <MDBCol md='4'>
                                <MDBInput
                                    outline
                                    onChange={changeHandler}
                                    type='text'
                                    name='NgayChuyenDen'
                                    label='Ngày chuyển đến '
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
                                    name='LyDoChuyenDen'
                                    label='Lý do chuyển đến'
                                    required
                                >
                                    <div className='invalid-feedback ml-4 pl-3'>
                                        * Bắt buộc
                                    </div>
                                </MDBInput>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md='4'>
                                <MDBInput
                                    outline
                                    onChange={changeHandler}
                                    type='text'
                                    name='NgayChuyenDi'
                                    label='Ngày chuyển đi'
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
                                    name='LyDoChuyenDi'
                                    label='Lý do chuyển đi'
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
                                    name='DiaChiMoi'
                                    label='Địa chỉ mới'
                                    required
                                >
                                    <div className='invalid-feedback ml-4 pl-3'>
                                        * Bắt buộc
                                    </div>
                                </MDBInput>
                            </MDBCol>
                        </MDBRow>

                        <MDBRow>
                            <MDBCol md='4'>
                                <MDBInput
                                    outline
                                    onChange={changeHandler}
                                    type='text'
                                    name='LyDoXoa'
                                    label='Lý do xóa'
                                    required
                                >
                                    <div className='invalid-feedback ml-4 pl-3'>
                                        * Bắt buộc
                                    </div>
                                </MDBInput>
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
                                    Lưu thay đổi    
                                </MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </form>
                </MDBCardBody>
            </MDBCard>

        </section>
    );
};

export default PersonDetail;