import React, {useEffect, useState} from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBRow,
    MDBTable,
    MDBTableBody,
    MDBView
} from 'mdbreact';
import {useHistory} from 'react-router-dom';

import TableHeader from '../TableHeader/TableHeader';
import Select from '../../Select/Select';
import {toVnDateFormat} from '../../../utils/utils';
import Pagination from '../../Pagination/Pagination';
import {statusToVietnamese} from '../../../utils/statusUtils';

const ReplyTable = (props) => {
    const history = useHistory();
    
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(null);
    
    useEffect(() => {
        props.handleGetReplies(currentPage, pageLimit);
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
    
    let replyList = [];
    let replies;
    let pagination;
    
    if (props.repliesData._embedded) {
        replies = props.repliesData._embedded.replies;
        const paging = props.repliesData.page;
        
        for (const reply of replies) {
            replyList.push(
                <tr key={reply.id} style={{cursor: 'pointer'}} onClick={() => {
                    history.push(`/replies/${reply.id}`);
                    history.go(0);
                }}>
                    <td>{reply.subject}</td>
                    <td>{toVnDateFormat(reply.date)}</td>
                    <td>{statusToVietnamese(reply.status)}</td>
                    {props.user || props.manager ? <td>{reply.replier}</td> : null}
                    <td>{reply.petition.sender}</td>
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
        'Trạng thái',
        'Gửi đến'
    ];
    if (props.user || props.manager) {
        headerFields = [
            'Tiêu đề',
            'Ngày gửi',
            'Trạng thái',
            'Người phản hồi',
            'Gửi đến'
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
                                    Phản hồi
                                </h3>
                            </MDBCol>
                        </MDBRow>
                    </MDBView>
                    
                    <MDBCardBody>
                        <MDBTable responsive hover>
                            <TableHeader fields={headerFields}/>
                            
                            <MDBTableBody>
                                {replyList}
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

export default ReplyTable;
