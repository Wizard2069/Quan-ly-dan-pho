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
import {toVnDateFormat} from '../../../utils/utils';
import Pagination from '../../Pagination/Pagination';
import {getCorrectionsByHouseholdId} from '../../../store/actions/corrections';
import CorrectionModal from '../../Modal/Correction/CorrectionModal';
import {infoToVietnamese} from '../../../utils/changeInfoUtils';

const CorrectionTable = (props) => {
    const correctionsData = useSelector(state => state.corrections);
    const dispatch = useDispatch();
    
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(null);
    
    const [modal, setModal] = useState(false);
    
    useEffect(() => {
        dispatch(getCorrectionsByHouseholdId(props.householdId, currentPage, pageLimit));
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
    
    let correctionList = [];
    let corrections;
    let pagination;
    
    if (correctionsData._embedded) {
        corrections = correctionsData._embedded.corrections;
        const paging = correctionsData.page;
        
        for (const correction of corrections) {
            correctionList.push(
                <tr key={correction.id}>
                    <td>{infoToVietnamese(correction.changeInfo)}</td>
                    <td>{correction.changeFrom}</td>
                    <td>{correction.changeTo}</td>
                    <td>{toVnDateFormat(correction.changeDay)}</td>
                    <td>{correction.performer.username}</td>
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
                                    Đính chính
                                </h3>
                            </MDBCol>
                            <MDBCol md='3'>
                                <MDBBtn color='blue accent-3' onClick={handleToggle}>
                                    Thêm đính chính
                                </MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </MDBView>
                    
                    <MDBCardBody>
                        <MDBTable responsive hover>
                            <TableHeader fields={[
                                'Thông tin thay đổi',
                                'Thay đổi từ',
                                'Thay đổi thành',
                                'Ngày thay đổi',
                                'Người thay đổi'
                            ]}/>
                            
                            <MDBTableBody>
                                {correctionList}
                            </MDBTableBody>
                        </MDBTable>
                        <Select onSelectChange={handleSelectChange}/>
                        {pagination}
                    </MDBCardBody>
                </MDBCard>
            </section>
            <CorrectionModal
                modal={modal}
                toggle={handleToggle}
                householdId={props.householdId}
            />
        </>
    );
};

export default React.memo(CorrectionTable);
