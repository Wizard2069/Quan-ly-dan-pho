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
import './people.css';
import DatePickerPage from "../components/DatePicker/DatePicker";
const People = () => {
  return (
    <div id='profile-v1'>
      <MDBContainer fluid>
        <MDBCard className='p-2 mb-5'>
          <MDBRow>
            <MDBCol lg='2' md='12'>
              <MDBSelect className='colorful-select dropdown-primary mx-2'>
                <MDBSelectInput selected='Lọc theo' />
                <MDBSelectOptions>
                  <MDBSelectOption disabled>Lọc theo</MDBSelectOption>
                  <MDBSelectOption value='1'>Ngày đến</MDBSelectOption>
                  <MDBSelectOption value='2'>Ngày đi</MDBSelectOption>
                </MDBSelectOptions>
              </MDBSelect>
            </MDBCol>
            <MDBCol lg ='2'>
              <small className='grey-text'>Từ ngày:</small>
              <DatePickerPage/>
            </MDBCol>
            <MDBCol lg='2'>
              <small className='grey-text'>Đến ngày:</small>
              <DatePickerPage/>
            </MDBCol>
            <MDBCol lg='2' md='12'>
              <MDBSelect className='colorful-select dropdown-primary mx-2'>
                <MDBSelectInput selected='Tìm kiếm theo' />
                <MDBSelectOptions>
                  <MDBSelectOption disabled>Tìm kiếm theo</MDBSelectOption>
                  <MDBSelectOption value='1'>Mã nhân khẩu</MDBSelectOption>
                  <MDBSelectOption value='2'>Chứng minh thư</MDBSelectOption>
                  <MDBSelectOption value='3'>Họ tên</MDBSelectOption>

                </MDBSelectOptions>
              </MDBSelect>
            </MDBCol>
            <MDBCol lg='2' md='10'>
              <MDBInput type='text' icon='search' label='Search' />
            </MDBCol>
            <MDBCol lg='2' className="d-flex justify-content-end align-items-center">
              <MDBBtn outline color='primary'>
                Submit
              </MDBBtn>
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
                  Quản lý nhân khẩu
                </a>
              </MDBCol>
              <MDBCol lg={3}>
                <MDBBtn color='blue accent-3'>
                  Thêm nhân khẩu
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </MDBView>


          <MDBCardBody>
            <MDBTable responsive hover>
              <thead>
                <tr>
                  <th>
                    <label
                      htmlFor='checkbox'
                      className='form-check-label mr-2 label-table'
                    />
                  </th>
                  <th className='th-lg text-center'>
                    Mã nhân khẩu

                  </th>
                  <th className='th-lg text-center'>
                    Họ tên

                  </th>
                  <th className='th-lg text-center'>
                    Năm sinh

                  </th>
                  <th className='th-lg text-center'>
                    Giới tính

                  </th>
                  <th className='th-lg text-center'>
                    Nghề nghiệp
                  </th>
                  <th className='th-lg text-center'>
                    Địa chỉ hiện nay
                  </th>
                  <th className='th-lg text-center'>
                    Số hộ chiếu
                  </th>
                  <th className='th-lg text-center'>
                    Ngày chuyển đến
                  </th>
                  <th className='th-lg text-center'>
                    Ngày chuyển đi
                  </th>
                  <th className='th-lg text-center'>
                    Ghi chú
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope='row'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id='checkbox1'
                    />
                    <label htmlFor='checkbox1' className='label-table' />
                  </th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>markotto@gmail.com</td>
                  <td>USA</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                  <td>jacobt@gmail.com</td>
                  <td>France</td>
                </tr>
                <tr>
                  <th scope='row'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id='checkbox2'
                    />
                    <label htmlFor='checkbox2' className='label-table' />
                  </th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                  <td>jacobt@gmail.com</td>
                  <td>France</td>
                  <td>France</td>
                  <td>France</td>
                  <td>France</td>
                  <td>France</td>
                  <td>France</td>
                </tr>
                <tr>
                  <th scope='row'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id='checkbox3'
                    />
                    <label htmlFor='checkbox3' className='label-table' />
                  </th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                  <td>larrybird@gmail.com</td>
                  <td>Germany</td>
                  <td>Jacobđasadsaaasdkljsdjlkfdslkfakfalfgfgfjfdsgjldfsglkfsjgfdslgjldfsgkldklgsj</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                  <td>jacobt@gmail.com</td>
                  <td>France</td>
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

export default People;
