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
import {Link, useHistory} from 'react-router-dom';

import TableHeader from '../TableHeader/TableHeader';
import Select from '../../Select/Select';
import {toVnDateFormat} from '../../../utils/utils';
import Pagination from '../../Pagination/Pagination';
import {statusToVietnamese} from '../../../utils/statusUtils';

const PetitionTable = (props) => {
    const history = useHistory();
    
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(null);
    
    useEffect(() => {
        props.handleGetPetitions(currentPage, pageLimit);
    }, [currentPage, pageLimit]);
    
    const handleOnChangePage = (data) => {
        setCurrentPage(data.page);
        setPageLimit(data.pageLimit);
    };
    
    const handleSelectChange = (value) => {
        const limit = parseInt(value.join(''));
        setCurrentPage(1);
        setPageLimit(limit);
    };
    
    let petitionList = [];
    let petitions;
    let pagination;
    
    if (props.petitionsData._embedded) {
        petitions = props.petitionsData._embedded.petitions;
        const paging = props.petitionsData.page;
        
        for (const petition of petitions) {
            petitionList.push(
                <tr key={petition.id} style={{cursor: 'pointer'}} onClick={() => {
                    history.push(`/petitions/${petition.id}`);
                    history.go(0);
                }}>
                    <td>{petition.subject}</td>
                    <td>{toVnDateFormat(petition.date)}</td>
                    <td>{statusToVietnamese(petition.status)}</td>
                    {props.president || props.manager ? <td>{petition.sender}</td> : null}
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
    
    let headerFields = [
        'Tiêu đề',
        'Ngày gửi',
        'Trạng thái'
    ];
    if (props.president || props.manager) {
        headerFields = [
            'Tiêu đề',
            'Ngày gửi',
            'Trạng thái',
            'Người gửi'
        ];
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
                                    Kiến nghị
                                </h3>
                            </MDBCol>
                            {props.user ?
                                <MDBCol md='3'>
                                    <MDBBtn color='blue accent-3'>
                                        <Link to='/petitions/add' className='white-text'>
                                            Thêm kiến nghị
                                        </Link>
                                    </MDBBtn>
                                </MDBCol> : null
                            }
                        </MDBRow>
                    </MDBView>
                    
                    <MDBCardBody>
                        <MDBTable responsive hover>
                            <TableHeader fields={headerFields}/>
                            
                            <MDBTableBody>
                                {petitionList}
                            </MDBTableBody>
                        </MDBTable>
                        <Select onSelectChange={handleSelectChange}/>
                        {pagination}
                    </MDBCardBody>
                </MDBCard>
            </section>
        </>
    );
};

export default PetitionTable;
