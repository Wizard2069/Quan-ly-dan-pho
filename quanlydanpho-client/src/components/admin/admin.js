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
import './admin.css';
import DatePickerPage from "../components/date/date";
const Admin = () => {
  return (
      <div id='profile-v1'>
        <MDBContainer fluid>
          <MDBCard className='p-2 mb-5'>
          </MDBCard>
          <MDBCard narrow className='pb-3'>
            <MDBView
                cascade
                className='gradient-card-header blue-gradient narrower py-2 mx-4 mb-3'
            >
              <MDBRow>
                <MDBCol lg={3}/>
                <MDBCol lg={6} className="d-flex justify-content-center align-items-center">
                  <a href='#!' className='white-text mx-3'>
                    Quản lý người dùng
                  </a>
                </MDBCol>
                <MDBCol lg={3}>
                  <MDBBtn color='blue accent-3'>
                    Thêm người dùng
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
                    <th className='th-lg'>
                      ID
                      <MDBIcon icon='sort' className='ml-1' />
                    </th>
                    <th className='th-lg'>
                      UserName
                      <MDBIcon icon='sort' className='ml-1' />
                    </th>
                    <th className='th-lg'>
                      Email
                      <MDBIcon icon='sort' className='ml-1' />
                    </th>
                    <th className='th-lg'>
                      LastName
                      <MDBIcon icon='sort' className='ml-1' />
                    </th>
                    <th className='th-lg'>
                      FirstName
                      <MDBIcon icon='sort' className='ml-1' />
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
                  </tr>
                  <tr>
                    <th scope='row'>
                      <input
                          className='form-check-input'
                          type='checkbox'
                          id='checkbox4'
                      />
                      <label htmlFor='checkbox4' className='label-table' />
                    </th>
                    <td>Paul</td>
                    <td>Topolski</td>
                    <td>@P_Topolski</td>
                    <td>ptopolski@gmail.com</td>
                    <td>Poland</td>
                  </tr>
                  <tr>
                    <th scope='row'>
                      <input
                          className='form-check-input'
                          type='checkbox'
                          id='checkbox5'
                      />
                      <label htmlFor='checkbox5' className='label-table' />
                    </th>
                    <td>Anna</td>
                    <td>Doe</td>
                    <td>@andy</td>
                    <td>annadoe@gmail.com</td>
                    <td>Spain</td>
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

export default Admin;
