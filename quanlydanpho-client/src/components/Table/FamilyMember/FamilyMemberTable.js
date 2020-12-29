import React, {useEffect, useState} from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBRow,
    MDBTable,
    MDBTableBody,
    MDBView
} from 'mdbreact';
import {useDispatch, useSelector} from 'react-redux';

import TableHeader from '../TableHeader/TableHeader';
import Select from '../../Select/Select';
import Pagination from '../../Pagination/Pagination';
import {getFamilyMembersByHouseholdId} from '../../../store/actions/familyMembers';
import FamilyMemberModal from '../../Modal/FamilyMember/FamilyMemberModal';

const FamilyMemberTable = (props) => {
    const familyMembersData = useSelector(state => state.familyMembers);
    const dispatch = useDispatch();
    
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(null);
    
    const [modal, setModal] = useState(false);
    
    useEffect(() => {
        dispatch(getFamilyMembersByHouseholdId(props.householdId, currentPage, pageLimit));
    }, [dispatch, props.householdId, currentPage, pageLimit]);
    
    const handleOnChangePage = (data) => {
        setCurrentPage(data.page);
        setPageLimit(data.pageLimit);
    };
    
    const handleSelectChange = (value) => {
        const limit = parseInt(value.join(''));
        setCurrentPage(1);
        setPageLimit(limit);
    };
    
    const handleToggle = () => {
        setModal(prevModal => !prevModal);
    };
    
    let familyMemberList = [];
    let familyMembers;
    let pagination;
    
    if (familyMembersData._embedded) {
        familyMembers = familyMembersData._embedded.familyMembers;
        const paging = familyMembersData.page;
        
        for (const familyMember of familyMembers) {
            familyMemberList.push(
                <tr key={familyMember.id}>
                    <td>{familyMember.person.peopleCode}</td>
                    <td>{familyMember.person.info.fullName}</td>
                    <td>{familyMember.hostRelation}</td>
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
        <>
            <section>
                <MDBCard narrow className='pb-3' style={{marginTop: '50px'}}>
                    <MDBView
                        cascade
                        className='gradient-card-header blue-gradient narrower py-2 mx-4 mb-3'
                    >
                        <MDBRow>
                            <MDBCol md='6' className="d-flex justify-content-center align-items-center offset-md-3">
                                <h3 className='white-text mx-3 mb-0'>
                                    Thành viên trong hộ
                                </h3>
                            </MDBCol>
                            <MDBCol md='3'>
                                <MDBBtn color='blue accent-3' onClick={handleToggle}>
                                    Thêm thành viên
                                </MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </MDBView>
                    
                    <MDBCardBody>
                        <MDBTable responsive hover>
                            <TableHeader fields={[
                                'Mã nhân khẩu',
                                'Họ tên',
                                'Quan hệ với chủ hộ'
                            ]}/>
                            
                            <MDBTableBody>
                                {familyMemberList}
                            </MDBTableBody>
                        </MDBTable>
                        <Select onSelectChange={handleSelectChange}/>
                        {pagination}
                    </MDBCardBody>
                </MDBCard>
            </section>
            <FamilyMemberModal
                modal={modal}
                toggle={handleToggle}
                householdId={props.householdId}
            />
        </>
    );
};

export default FamilyMemberTable;
