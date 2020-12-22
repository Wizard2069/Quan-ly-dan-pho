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
import DatePickerPage from "../components/date/date";
const Form_phanHoi = () => {
    return (
        <div id='profile-v1'>
            <MDBContainer fluid>

                <MDBCard narrow className='pb-3'>
                    <MDBView
                        cascade
                        className='gradient-card-header blue-gradient narrower py-2 mx-4 mb-3 '
                    >
                        <MDBRow style={{height: '55px'}}>
                            <MDBCol lg={6} className="d-flex justify-content-center align-items-center offset-lg-3">
                                <a href='#!' className='white-text mx-3'>
                                   Danh sách phản hồi
                                </a>
                            </MDBCol>
                        </MDBRow>
                    </MDBView>


                    <MDBCardBody>
                        <MDBTable responsive hover>
                            <thead>
                                <tr>
                                        <th scope='col' className='text-center' style={{width: '200px'}}>
                                           Người gửi
                                        </th>
                                       <th scope='col' className='text-center'>
                                           Tiêu đề
                                       </th>


                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Test</td>
                                    <td>Otto</td>
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

export default Form_phanHoi;
