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
import {getStoriesByPersonId} from '../../../store/actions/stories';
import {toVnDateFormat} from '../../../utils/utils';
import Pagination from '../../Pagination/Pagination';
import StoryModal from '../../Modal/Story/StoryModal';

const StoryTable = (props) => {
    const storiesData = useSelector(state => state.stories);
    const dispatch = useDispatch();
    
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(null);
    
    const [modal, setModal] = useState(false);
    
    useEffect(() => {
        dispatch(getStoriesByPersonId(props.personId, currentPage, pageLimit));
    }, [dispatch, props.personId, currentPage, pageLimit]);
    
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
    
    let storyList = [];
    let stories;
    let pagination;
    
    if (storiesData._embedded) {
        stories = storiesData._embedded.stories;
        const paging = storiesData.page;
    
        for (const story of stories) {
            storyList.push(
                <tr key={story.id}>
                    <td>{toVnDateFormat(story.interval.from)}</td>
                    <td>{toVnDateFormat(story.interval.to)}</td>
                    <td>{story.address}</td>
                    <td>{story.job}</td>
                    <td>{story.workplace}</td>
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
                                Tiểu sử
                            </h3>
                        </MDBCol>
                        <MDBCol md='3'>
                            <MDBBtn color='blue accent-3' onClick={handleToggle}>
                                Thêm tiểu sử
                            </MDBBtn>
                        </MDBCol>
                    </MDBRow>
                </MDBView>
            
                <MDBCardBody>
                    <MDBTable responsive hover>
                        <TableHeader fields={[
                            'Từ ngày',
                            'Đến ngày',
                            'Địa chỉ',
                            'Nghề nghiệp',
                            'Nơi làm việc'
                        ]}/>
                    
                        <MDBTableBody>
                            {storyList}
                        </MDBTableBody>
                    </MDBTable>
                    <Select onSelectChange={handleSelectChange}/>
                    {pagination}
                </MDBCardBody>
            </MDBCard>
        </section>
        <StoryModal
            modal={modal}
            toggle={handleToggle}
            personId={props.personId}
        />
        </>
    );
};

export default StoryTable;
