import React, {useEffect, useState} from 'react';
import {
    MDBBtn,
    MDBCard, MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBTable,
    MDBTableBody,
    MDBView
} from 'mdbreact';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import DatePicker from '../../components/DatePicker/DatePicker';
import TableHeader from '../../components/Table/TableHeader/TableHeader';
import Select from '../../components/Select/Select';
import {getAllTempAbsents} from '../../store/actions/tempAbsents';
import {toVnDateFormat} from '../../utils/utils';
import Pagination from '../../components/Pagination/Pagination';

const TempAbsent = () => {
    const tempAbsentsData = useSelector(state => state.tempAbsents);
    const dispatch = useDispatch();
    
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [dateRange, setDateRange] = useState(null);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(null);
    
    const onGetPickerValueFrom = (value) => {
        setFromDate(value.toLocaleDateString('fr-CA'));
    };
    
    const onGetPickerValueTo = (value) => {
        setToDate(value.toLocaleDateString('fr-CA'));
    };
    
    const handleOnResetClick = () => {
        setFromDate(null);
        setToDate(null);
    };
    
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
        if (fromDate && toDate) {
            setDateRange(fromDate + ',' + toDate);
        }
    }, [fromDate, toDate]);
    
    useEffect(() => {
        dispatch(getAllTempAbsents(currentPage, pageLimit, dateRange));
    }, [dispatch, dateRange, currentPage, pageLimit]);
    
    let tempAbsentList = [];
    let tempAbsents;
    let pagination;
    
    if (tempAbsentsData._embedded) {
        tempAbsents = tempAbsentsData._embedded.tempAbsents;
        const paging = tempAbsentsData.page;
    
        for (const tempAbsent of tempAbsents) {
            tempAbsentList.push(
                <tr key={tempAbsent.id}>
                    <td>{tempAbsent.person.peopleCode}</td>
                    <td>{tempAbsent.person.info.fullName}</td>
                    <td>{tempAbsent.tempAbsentCode}</td>
                    <td>{tempAbsent.tempResidencePlace}</td>
                    <td>{toVnDateFormat(tempAbsent.interval.from)}</td>
                    <td>{toVnDateFormat(tempAbsent.interval.to)}</td>
                    <td>{tempAbsent.reason}</td>
                </tr>
            )
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
                <MDBCard className='p-2 mb-5'>
                    <MDBRow>
                        <MDBCol md='3'>
                            <small className='grey-text'>Từ ngày:</small>
                            <DatePicker getPickerValue={onGetPickerValueFrom}/>
                        </MDBCol>
                        <MDBCol md='3'>
                            <small className='grey-text'>Đến ngày:</small>
                            <DatePicker getPickerValue={onGetPickerValueTo}/>
                        </MDBCol>
                        <MDBCol md='4' className='offset-md-2 text-right'>
                            <MDBBtn color='primary' onClick={handleOnResetClick}>Xoá bộ lọc</MDBBtn>
                        </MDBCol>
                    </MDBRow>
                </MDBCard>
                <MDBCard narrow className='pb-3'>
                    <MDBView
                        cascade
                        className='gradient-card-header blue-gradient narrower py-2 mx-4 mb-3 '
                    >
                        <MDBRow>
                            <MDBCol md='6' className="d-flex justify-content-center align-items-center offset-md-3">
                                <h3 className='white-text mx-3 mb-0'>
                                    Quản lý tạm vắng
                                </h3>
                            </MDBCol>
                            <MDBCol md='3'>
                                <MDBBtn color='blue accent-3'>
                                    <Link to='/tempAbsents/add' className='white-text'>
                                        Thêm tạm vắng
                                    </Link>
                                </MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </MDBView>
                    
                    <MDBCardBody>
                        <MDBTable responsive hover>
                            <TableHeader fields={[
                                'Mã nhân khẩu',
                                'Họ tên',
                                'Mã tạm vắng',
                                'Nơi tạm trú',
                                'Từ ngày',
                                'Đến ngày',
                                'Lý do'
                            ]}/>
                            
                            <MDBTableBody>
                                {tempAbsentList}
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

export default React.memo(TempAbsent);
