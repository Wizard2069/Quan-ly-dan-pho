import React, {useEffect, useState} from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBTable,
    MDBTableBody,
    MDBView
} from 'mdbreact';
import {useDispatch, useSelector} from 'react-redux';

import TableHeader from '../TableHeader/TableHeader';
import Select from '../../Select/Select';
import {getStoriesByPersonId} from '../../../store/actions/stories';
import {toVnDateFormat} from '../../../utils/utils';
import Pagination from '../../Pagination/Pagination';
import {getHouseholdHistoriesById} from '../../../store/actions/householdHistories';
import {eventToVietnamese} from '../../../utils/eventUtils';

const HouseholdHistoryTable = (props) => {
    const householdHistoriesData = useSelector(state => state.householdHistories);
    const dispatch = useDispatch();
    
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(null);
    
    useEffect(() => {
        dispatch(getHouseholdHistoriesById(props.householdId, currentPage, pageLimit));
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
    
    let householdHistoryList = [];
    let householdHistories;
    let pagination;
    
    if (householdHistoriesData._embedded) {
        householdHistories = householdHistoriesData._embedded.householdHistories;
        const paging = householdHistoriesData.page;
        
        for (const householdHistory of householdHistories) {
            householdHistoryList.push(
                <tr key={householdHistory.id}>
                    <td>{eventToVietnamese(householdHistory.event)}</td>
                    <td>{toVnDateFormat(householdHistory.date)}</td>
                    <td>{householdHistory.affectPerson?.peopleCode ?? ''}</td>
                    <td>{householdHistory.affectPerson?.info.fullName ?? ''}</td>
                    <td>{householdHistory.newHousehold?.householdCode ?? ''}</td>
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
                        <h3 className='white-text mx-3 mb-0'>
                            Lịch sử biến động
                        </h3>
                    </MDBView>
                    
                    <MDBCardBody>
                        <MDBTable responsive hover>
                            <TableHeader fields={[
                                'Sự kiện',
                                'Ngày',
                                'Mã nhân khẩu liên quan',
                                'Tên người liên quan',
                                'Mã hộ khẩu liên quan'
                            ]}/>
                            
                            <MDBTableBody>
                                {householdHistoryList}
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

export default HouseholdHistoryTable;
