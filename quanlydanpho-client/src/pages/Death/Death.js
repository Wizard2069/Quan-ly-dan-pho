import React, {useEffect, useState} from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBTable,
    MDBTableBody,
    MDBView
} from 'mdbreact';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import TableHeader from '../../components/Table/TableHeader/TableHeader';
import Select from '../../components/Select/Select';
import DatePicker from '../../components/DatePicker/DatePicker';
import {getAllDeaths} from '../../store/actions/deaths';
import {toVnDateFormat} from '../../utils/utils';
import Pagination from '../../components/Pagination/Pagination';

const Death = () => {
    const deathsData = useSelector(state => state.deaths);
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
        dispatch(getAllDeaths(currentPage, pageLimit, dateRange))
    }, [dispatch, currentPage, pageLimit, dateRange]);
    
    let deathList = [];
    let deaths;
    let pagination;
    
    if (deathsData._embedded) {
        deaths = deathsData._embedded.deaths;
        const paging = deathsData.page;
    
        for (const death of deaths) {
            deathList.push(
                <tr key={death.id}>
                    <td>{death.deathCertNumber}</td>
                    <td>{death.declaredPerson.peopleCode}</td>
                    <td>{death.deathPerson.peopleCode}</td>
                    <td>{death.deathPerson.info.fullName}</td>
                    <td>{toVnDateFormat(death.declaredDay)}</td>
                    <td>{toVnDateFormat(death.deathDay)}</td>
                    <td>{death.deathReason}</td>
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
        <section>
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
                <MDBCard narrow className='pb-3' style={{marginTop: '50px'}}>
                    <MDBView
                        cascade
                        className='gradient-card-header blue-gradient narrower py-2 mx-4 mb-3'
                    >
                        <MDBRow>
                            <MDBCol md='6' className="d-flex justify-content-center align-items-center offset-md-3">
                                <h3 className='white-text mx-3 mb-0'>
                                    Quản lý khai tử
                                </h3>
                            </MDBCol>
                            <MDBCol md='3'>
                                <MDBBtn color='blue accent-3'>
                                    <Link to='/deaths/add' className='white-text'>
                                        Thêm khai tử
                                    </Link>
                                </MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </MDBView>
                    
                    <MDBCardBody>
                        <MDBTable responsive hover>
                            <TableHeader fields={[
                                'Số giấy khai tử',
                                'Mã nhân khẩu người khai',
                                'Mã nhân khẩu người chết',
                                'Tên người chết',
                                'Ngày khai',
                                'Ngày chết',
                                'Lý do chết'
                            ]}/>
                            
                            <MDBTableBody>
                                {deathList}
                            </MDBTableBody>
                        </MDBTable>
                        <Select onSelectChange={handleSelectChange}/>
                        {pagination}
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </section>
    );
};

export default React.memo(Death);
