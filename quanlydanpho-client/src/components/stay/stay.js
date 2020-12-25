import React from 'react';
import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBContainer,
    MDBIcon,
    MDBBtn,
    MDBTable,
    MDBView,
    MDBSelect,
    MDBSelectInput,
    MDBSelectOptions,
    MDBSelectOption,
    MDBPagination,
    MDBPageItem,
    MDBPageNav
} from 'mdbreact';
import '../components/buttons/buttons.css';
import './stay.css';
import DatePickerPage from "../components/DatePicker/DatePicker";
const Stay = () => {
    return (
        <div id='profile-v1'>
            <MDBContainer fluid>
                <MDBCard className='p-3 mb-5'>
                    <MDBRow>
                        <MDBCol lg ='2'>
                            <small className='grey-text'>Từ ngày:</small>
                            <DatePickerPage/>
                        </MDBCol>
                        <MDBCol lg='2'>
                            <small className='grey-text'>Đến ngày:</small>
                            <DatePickerPage/>
                        </MDBCol>
                    </MDBRow>
                </MDBCard>
                <MDBCard narrow className='pb-3'>
                    <MDBView
                        cascade
                        className='gradient-card-header blue-gradient narrower py-2 mx-4 mb-3 '
                    >
                        <MDBRow>
                            <MDBCol lg={3}/>
                            <MDBCol lg={6} className="d-flex justify-content-center align-items-center">
                                <a href='#!' className='white-text mx-3'>
                                    Quản lý tạm trú
                                </a>
                            </MDBCol>
                            <MDBCol lg={3}>
                                <MDBBtn color='blue accent-3'>
                                   Thêm tạm trú
                                </MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </MDBView>
                    <MDBCardBody>
                        <MDBTable responsive hover>
                            <thead>
                                <tr>
                                    <th className='th-lg text-center'>
                                        Mã nhân khẩu
                                    </th>
                                    <th className='th-lg text-center'>
                                        Mã giấy tạm trú
                                    </th>
                                    <th className='th-lg text-center'>
                                        Số điện thoại
                                    </th>
                                    <th className='th-lg text-center'>
                                        Từ ngày
                                    </th>
                                    <th className='th-lg text-center'>
                                        Đến ngày
                                    </th>
                                    <th className='th-lg text-center'>
                                        Lý do
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='text-center'>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>markotto@gmail.com</td>
                                    <td>USA</td>
                                    <td>Jacob</td>
                                </tr>
                            </tbody>
                        </MDBTable>
                        <MDBSelect className='colorful-select w-10 float-left dropdown-primary mt-2 hidden-md-down'>
                            <MDBSelectInput selected='Rows number' />
                            <MDBSelectOptions>
                                <MDBSelectOption disabled>Rows number</MDBSelectOption>
                                <MDBSelectOption value='1'>5 rows</MDBSelectOption>
                                <MDBSelectOption value='2'>25 rows</MDBSelectOption>
                                <MDBSelectOption value='3'>50 rows</MDBSelectOption>
                                <MDBSelectOption value='4'>100 rows</MDBSelectOption>
                            </MDBSelectOptions>
                        </MDBSelect>
                        <MDBPagination circle className='my-4 float-right'>
                            <li className='page-item disabled clearfix d-none d-md-block'>
                                <a className='page-link' href='#!'>
                                    First
                                </a>
                            </li>
                            <MDBPageItem disabled>
                                <MDBPageNav className='page-link' aria-label='Previous'>
                                    <span aria-hidden='true'>&laquo;</span>
                                    <span className='sr-only'>Previous</span>
                                </MDBPageNav>
                            </MDBPageItem>
                            <MDBPageItem active>
                                <MDBPageNav className='page-link'>
                                    1 <span className='sr-only'>(current)</span>
                                </MDBPageNav>
                            </MDBPageItem>
                            <MDBPageItem>
                                <MDBPageNav className='page-link'>2</MDBPageNav>
                            </MDBPageItem>
                            <MDBPageItem>
                                <MDBPageNav className='page-link'>3</MDBPageNav>
                            </MDBPageItem>
                            <MDBPageItem>
                                <MDBPageNav className='page-link'>4</MDBPageNav>
                            </MDBPageItem>
                            <MDBPageItem>
                                <MDBPageNav className='page-link'>5</MDBPageNav>
                            </MDBPageItem>
                            <MDBPageItem>
                                <MDBPageNav className='page-link' aria-label='Next'>
                                    <span aria-hidden='true'>&raquo;</span>
                                    <span className='sr-only'>Next</span>
                                </MDBPageNav>
                            </MDBPageItem>
                        </MDBPagination>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </div>
    );
};

export default Stay;
