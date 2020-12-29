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
} from 'mdbreact';
import {useDispatch, useSelector} from 'react-redux';
import {useDebounce} from 'use-debounce';
import {Link, useHistory} from 'react-router-dom';

import TableHeader from '../../components/Table/TableHeader/TableHeader';
import Select from '../../components/Select/Select';
import {toVnDateFormat} from '../../utils/utils';
import Pagination from '../../components/Pagination/Pagination';
import {getAllHouseholds} from '../../store/actions/households';

const Household = () => {
    const history = useHistory();
    const householdsData = useSelector(state => state.households);
    const dispatch = useDispatch();
    
    const [searchType, setSearchType] = useState(null);
    const [keyword, setKeyword] = useState(null);

    const [selectedSearchTypeText, setSelectedSearchTypeText] = useState('Tìm kiếm theo');
    
    const [resetSearchInput, setResetSearchInput] = useState('false');
    
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(null);
    
    const [value] = useDebounce(keyword, 1000);
    
    const onGetSearchTypeValue = (value) => {
        setSearchType(value.join(''));
    };
    
    const handleOnChangeSearchValue = (value) => {
        if (searchType) {
            setKeyword(value);
        }
    };
    
    const handleOnResetClick = () => {
        setKeyword(null);
        setSearchType(null);
        setSelectedSearchTypeText('Tìm kiếm theo');
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
        dispatch(getAllHouseholds(currentPage, pageLimit, value, searchType));
    }, [dispatch, currentPage, pageLimit, value, searchType]);
    
    let householdList = [];
    let households;
    let pagination;
    
    if (householdsData._embedded) {
        households = householdsData._embedded.households;
        const paging = householdsData.page;

        for (const household of households) {
            householdList.push(
                <tr key={household.id} style={{cursor: 'pointer'}} onClick={
                    () => {
                        history.push(`/households/${household.id}`);
                        history.go(0);
                    }
                }>
                    <td>{household.householdCode}</td>
                    <td>{household.host.peopleCode}</td>
                    <td>{household.host.fullName}</td>
                    <td>{household.address}</td>
                    <td>{toVnDateFormat(household.createdDay)}</td>
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
                        <MDBCol md='3'>
                            <MDBSelect
                                key={selectedSearchTypeText}
                                className='colorful-select dropdown-primary mx-2'
                                getValue={onGetSearchTypeValue}
                                getTextContent={(value) => setSelectedSearchTypeText(value)}
                            >
                                <MDBSelectInput selected={selectedSearchTypeText}/>
                                <MDBSelectOptions>
                                    <MDBSelectOption disabled>Tìm kiếm theo</MDBSelectOption>
                                    <MDBSelectOption value='host'>Tên chủ hộ</MDBSelectOption>
                                    <MDBSelectOption value='address'>Địa chỉ</MDBSelectOption>
                                </MDBSelectOptions>
                            </MDBSelect>
                        </MDBCol>
                        <MDBCol md='4'>
                            <MDBInput
                                key={resetSearchInput}
                                type='text'
                                icon='search'
                                label='Tìm kiếm'
                                getValue={handleOnChangeSearchValue}
                            />
                        </MDBCol>
                        <MDBCol md='5' className='text-right mt-3'>
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
                                    Quản lý hộ khẩu
                                </h3>
                            </MDBCol>
                            <MDBCol md='3'>
                                <MDBBtn color='blue accent-3'>
                                    <Link to='/households/add' className='white-text'>
                                        Thêm hộ khẩu
                                    </Link>
                                </MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </MDBView>
                    
                    <MDBCardBody>
                        <MDBTable responsive hover>
                            <TableHeader fields={[
                                'Mã hộ khẩu',
                                'Mã nhân khẩu chủ hộ',
                                'Tên chủ hộ',
                                'Địa chỉ',
                                'Ngày lập'
                            ]}/>
                            
                            <MDBTableBody>
                                {householdList}
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

export default React.memo(Household);
