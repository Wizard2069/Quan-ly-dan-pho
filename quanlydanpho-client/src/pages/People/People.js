import React, {useEffect, useState} from 'react';
import {
    MDBContainer,
    MDBCard,
    MDBRow,
    MDBCol,
    MDBSelect,
    MDBSelectInput,
    MDBSelectOptions,
    MDBSelectOption,
    MDBInput,
    MDBBtn,
    MDBView,
    MDBCardBody,
    MDBTable,
    MDBTableBody,
    MDBFormInline
} from 'mdbreact';
import {useDispatch, useSelector} from 'react-redux';
import {useDebounce} from 'use-debounce';

import DatePicker from '../../components/DatePicker/DatePicker';
import TableHeader from '../../components/TableHeader/TableHeader';
import Select from '../../components/Select/Select';
import {getPeople} from '../../store/actions/people';
import {toVnDateFormat, toVnSex} from '../../utils/utils';
import Pagination from '../../components/Pagination/Pagination';
import {Link} from 'react-router-dom';

const People = () => {
    const peopleData = useSelector(state => state.people);
    const dispatch = useDispatch();
    
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [dateRange, setDateRange] = useState(null);
    const [status, setStatus] = useState(null);
    const [searchType, setSearchType] = useState(null);
    const [keyword, setKeyword] = useState(null);
    const [radio, setRadio] = useState(null);
    const [sex, setSex] = useState(null);
    const [age, setAge] = useState(null);
    
    const [selectedStatusText, setSelectedStatusText] = useState('Thời gian');
    const [selectedSearchTypeText, setSelectedSearchTypeText] = useState('Tìm kiếm theo');
    const [selectedAgeText, setSelectedAgeText] = useState('Độ tuổi');
    
    const [resetSearchInput, setResetSearchInput] = useState('false');
    
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(null);
    
    const [value] = useDebounce(keyword, 1000);
    
    const onGetDateStatusValue = (value) => {
        setStatus(value.join(''));
    };
    
    const onGetPickerValueFrom = (value) => {
        setFromDate(value.toLocaleDateString('fr-CA'));
    };
    
    const onGetPickerValueTo = (value) => {
        setToDate(value.toLocaleDateString('fr-CA'));
    };
    
    const onGetSearchTypeValue = (value) => {
        setSearchType(value.join(''));
    };
    
    const handleOnChangeSearchValue = (value) => {
        if (searchType) {
            setKeyword(value);
        }
    };
    
    const onGetAgeValue = (value) => {
        setAge(value.join(''));
    };
    
    const handleOnClickRadio = (e, nr) => {
        setRadio(nr);
        setSex(e.target.value);
    };
    
    const handleOnResetClick = () => {
        setDateRange(null);
        setKeyword(null);
        setSex(null);
        setAge(null);
        setRadio(null);
        setSearchType(null);
        setStatus(null);
        setFromDate(null);
        setToDate(null);
        setSelectedStatusText('Thời gian');
        setSelectedSearchTypeText('Tìm kiếm theo');
        setSelectedAgeText('Độ tuổi');
        setResetSearchInput('true');
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
        if (resetSearchInput === 'true') {
            setResetSearchInput('false');
        }
    }, [resetSearchInput]);
    
    useEffect(() => {
        if (fromDate && toDate) {
            setDateRange(fromDate + ',' + toDate);
        }
    }, [fromDate, toDate]);
    
    useEffect(() => {
        dispatch(getPeople(currentPage, pageLimit, dateRange, status, value, searchType, sex, age));
    }, [dispatch, currentPage, pageLimit, dateRange, value, sex, age]);
    
    let personList = [];
    let people;
    let pagination;
    
    if (peopleData._embedded) {
        people = peopleData._embedded.people;
        const paging = peopleData.page;
        
        for (const person of people) {
            personList.push(
                <tr key={person.id} style={{cursor: 'pointer'}}>
                    <td>{person.peopleCode}</td>
                    <td>{person.fullName}</td>
                    <td>{toVnDateFormat(person.birthday)}</td>
                    <td>{toVnSex(person.sex)}</td>
                    <td>{person.job}</td>
                    <td>{person.currentAddress}</td>
                    <td>{person.passportNumber}</td>
                    <td>{person.arrivalDate ? toVnDateFormat(person.arrivalDate) : null}</td>
                    <td>{person.leaveDate ? toVnDateFormat(person.leaveDate) : null}</td>
                    <td>{person.note}</td>
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
                <MDBCard className='p-2 mb-5'>
                    <MDBRow>
                        <MDBCol lg='2' md='4'>
                            <MDBSelect
                                key={selectedStatusText}
                                className='colorful-select dropdown-primary mx-2'
                                getValue={onGetDateStatusValue}
                                getTextContent={(value) => setSelectedStatusText(value)}
                            >
                                <MDBSelectInput selected={selectedStatusText}/>
                                <MDBSelectOptions>
                                    <MDBSelectOption disabled>Thời gian</MDBSelectOption>
                                    <MDBSelectOption value='arrival'>Ngày đến</MDBSelectOption>
                                    <MDBSelectOption value='leave'>Ngày đi</MDBSelectOption>
                                </MDBSelectOptions>
                            </MDBSelect>
                        </MDBCol>
                        <MDBCol lg='2' md='3' style={{marginTop: '7px'}}>
                            <small className='grey-text'>Từ ngày:</small>
                            <DatePicker getPickerValue={onGetPickerValueFrom}/>
                        </MDBCol>
                        <MDBCol lg='2' md='3' style={{marginTop: '7px'}}>
                            <small className='grey-text'>Đến ngày:</small>
                            <DatePicker getPickerValue={onGetPickerValueTo}/>
                        </MDBCol>
                        <MDBCol lg='2' md='6'>
                            <MDBSelect
                                key={selectedSearchTypeText}
                                className='colorful-select dropdown-primary mx-2'
                                getValue={onGetSearchTypeValue}
                                getTextContent={(value) => setSelectedSearchTypeText(value)}
                            >
                                <MDBSelectInput selected={selectedSearchTypeText}/>
                                <MDBSelectOptions>
                                    <MDBSelectOption disabled>Tìm kiếm theo</MDBSelectOption>
                                    <MDBSelectOption value='code'>Mã nhân khẩu</MDBSelectOption>
                                    <MDBSelectOption value='id-card'>Chứng minh thư</MDBSelectOption>
                                    <MDBSelectOption value='name'>Họ tên</MDBSelectOption>
                                </MDBSelectOptions>
                            </MDBSelect>
                        </MDBCol>
                        <MDBCol lg='4' md='6'>
                            <MDBInput
                                key={resetSearchInput}
                                type='text'
                                icon='search'
                                label='Tìm kiếm'
                                getValue={handleOnChangeSearchValue}
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md='3'>
                            <MDBSelect
                                key={selectedAgeText}
                                className='colorful-select dropdown-primary mx-2 mt-0'
                                getValue={onGetAgeValue}
                                getTextContent={(value) => setSelectedAgeText(value)}
                            >
                                <MDBSelectInput selected={selectedAgeText}/>
                                <MDBSelectOptions>
                                    <MDBSelectOption disabled>Chọn độ tuổi</MDBSelectOption>
                                    <MDBSelectOption value='0,2'>Mầm non</MDBSelectOption>
                                    <MDBSelectOption value='3-5'>Mẫu giáo</MDBSelectOption>
                                    <MDBSelectOption value='6,10'>Cấp 1</MDBSelectOption>
                                    <MDBSelectOption value='11,14'>Cấp 2</MDBSelectOption>
                                    <MDBSelectOption value='15,17'>Cấp 3</MDBSelectOption>
                                    <MDBSelectOption value='18,60'>Độ tuổi lao động</MDBSelectOption>
                                    <MDBSelectOption value='61,150'>Độ tuổi nghỉ hưu</MDBSelectOption>
                                </MDBSelectOptions>
                            </MDBSelect>
                        </MDBCol>
                        <MDBCol md='4' className='d-flex justify-content-center align-items-center'>
                            <MDBFormInline>
                                <MDBInput
                                    value='male'
                                    onClick={(e) => handleOnClickRadio(e,1)}
                                    checked={radio === 1}
                                    label='Nam'
                                    type='radio'
                                    id='radio1'
                                    containerClass='mr-5'
                                />
                                <MDBInput
                                    value='female'
                                    onClick={(e) => handleOnClickRadio(e,2)}
                                    checked={radio === 2}
                                    label='Nữ'
                                    type='radio'
                                    id='radio2'
                                    containerClass='mr-5'
                                />
                            </MDBFormInline>
                        </MDBCol>
                        <MDBCol md='4' className='offset-md-1'>
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
                                <a href='#!' className='white-text mx-3'>
                                    Quản lý nhân khẩu
                                </a>
                            </MDBCol>
                            <MDBCol md='3'>
                                <MDBBtn color='blue accent-3'>
                                    <Link to='/people/add' className='white-text'>
                                        Thêm nhân khẩu
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
                                'Ngày sinh',
                                'Giới tính',
                                'Nghề nghiệp',
                                'Địa chỉ hiện tại',
                                'Số hộ chiếu',
                                'Ngày chuyển đến',
                                'Ngày chuyển đi',
                                'Ghi chú'
                            ]}/>
                            
                            <MDBTableBody>
                                {personList}
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

export default React.memo(People);
