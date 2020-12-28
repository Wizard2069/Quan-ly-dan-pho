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
import {getAllStays} from '../../store/actions/stays';
import {toVnDateFormat} from '../../utils/utils';
import Pagination from '../../components/Pagination/Pagination';

const Stay = () => {
    const staysData = useSelector(state => state.stays);
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
        dispatch(getAllStays(currentPage, pageLimit, dateRange));
    }, [dispatch, dateRange, currentPage, pageLimit]);
    
    let stayList = [];
    let stays;
    let pagination;
    
    if (staysData._embedded) {
        stays = staysData._embedded.stays;
        const paging = staysData.page;
        
        for (const stay of stays) {
            stayList.push(
                <tr key={stay.id}>
                    <td>{stay.person.peopleCode}</td>
                    <td>{stay.person.info.fullName}</td>
                    <td>{stay.tempResidentCode}</td>
                    <td>{stay.phoneNumber}</td>
                    <td>{toVnDateFormat(stay.interval.from)}</td>
                    <td>{toVnDateFormat(stay.interval.to)}</td>
                    <td>{stay.reason}</td>
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
                                    Quản lý tạm trú
                                </h3>
                            </MDBCol>
                            <MDBCol md='3'>
                                <MDBBtn color='blue accent-3'>
                                    <Link to='/stays/add' className='white-text'>
                                        Thêm tạm trú
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
                                'Mã tạm trú',
                                'Số điện thoại',
                                'Từ ngày',
                                'Đến ngày',
                                'Lý do'
                            ]}/>
                            
                            <MDBTableBody>
                                {stayList}
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

export default React.memo(Stay);
