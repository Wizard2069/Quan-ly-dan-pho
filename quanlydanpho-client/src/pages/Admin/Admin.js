import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBContainer,
    MDBBtn,
    MDBTable,
    MDBView,
    MDBTableBody
} from 'mdbreact';
import {Link} from 'react-router-dom';

import {getUsers} from '../../store/actions/users';
import Pagination from '../../components/Pagination/Pagination';
import Select from '../../components/Select/Select';
import TableHeader from '../../components/Table/TableHeader/TableHeader';

const Admin = () => {
    const usersData = useSelector(state => state.users);
    const err = useSelector(state => state.error);
    const dispatch = useDispatch();
    
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(null);
    
    const handleSelectChange = (value) => {
        const limit = parseInt(value.join(''));
        setCurrentPage(1);
        setPageLimit(limit);
    };
    
    const handleOnChangePage = (data) => {
        setCurrentPage(data.page);
        setPageLimit(data.pageLimit);
    };
    
    useEffect(() => {
        dispatch(getUsers(currentPage, pageLimit));
    }, [dispatch, pageLimit, currentPage]);
    
    let userList = [];
    let users;
    let pagination;
    
    if (usersData._embedded) {
        users = usersData._embedded.users;
        const paging = usersData.page;
        
        for (const user of users) {
            userList.push(
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                </tr>
            );
        }
        
        pagination = (
            <Pagination
                totalElements={paging.totalElements}
                totalPages={paging.totalPages}
                pageLimit={paging.size}
                currentPage={paging.number}
                onChangePage={handleOnChangePage}
            />
        );
    }
    
    return (
        <div id='profile-v1'>
            <MDBContainer fluid>
                <MDBCard narrow className='pb-3'>
                    <MDBView
                        cascade
                        className='gradient-card-header blue-gradient narrower py-2 mx-4 mb-3'
                    >
                        <MDBRow>
                            <MDBCol md='6' className="d-flex justify-content-center align-items-center offset-md-3">
                                <h3 className='white-text mx-3 mb-0'>
                                    Quản lý người dùng
                                </h3>
                            </MDBCol>
                            <MDBCol md='3'>
                                <MDBBtn color='blue accent-3'>
                                    <Link to='/users/add' className='white-text'>
                                        Thêm người dùng
                                    </Link>
                                </MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </MDBView>
                    
                    <MDBCardBody>
                        <MDBTable responsive hover className='table-fixed'>
                            <TableHeader fields={['ID', 'Username', 'Email']}/>
                            
                            <MDBTableBody>
                                {userList}
                            </MDBTableBody>
                        </MDBTable>
                        <Select onSelectChange={handleSelectChange}/>
                        {pagination}
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </div>
    );
};

export default React.memo(Admin);
