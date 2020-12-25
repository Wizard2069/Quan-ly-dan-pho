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
import DatePicker from "../components/components/DatePicker/DatePicker";


const DeathDeclare = () => {
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
                    <h2 className='h2-responsive mb-2'>Khai tử</h2>
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
                                    name='SoGiayKhaiTu'
                                    label='Số giấy khai tử'
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
                                    name='CMTNguoiKhai'
                                    label='CMT người khai'
                                />
                            </MDBCol>
                            <MDBCol md='4'>
                                <MDBInput
                                    outline
                                    onChange={changeHandler}
                                    type='text'
                                    name='MaNguoiChet'
                                    label='Mã người chết'
                                />
                            </MDBCol>
                        </MDBRow>

                        <MDBRow>
                            <MDBCol md='4'>
                                <MDBInput
                                    outline
                                    onChange={changeHandler}
                                    type='text'
                                    name='NgayKhai'
                                    label='Ngày khai'
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
                                    name='NgayChet'
                                    label='Ngày chết'
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
                                    name='LyDoChet'
                                    label='Lý do chết'
                                    required
                                >
                                    <div className='invalid-feedback ml-4 pl-3'>
                                        * Bắt buộc
                                    </div>
                                </MDBInput>
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

export default DeathDeclare;