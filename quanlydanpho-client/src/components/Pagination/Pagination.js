import React, {useEffect, useState} from 'react';
import {MDBPageItem, MDBPageNav, MDBPagination} from 'mdbreact';

const Pagination = (props) => {
    const [totalElements, setTotalElements] = useState(null);
    const [pageLimit, setPageLimit] = useState(null);
    const [totalPages, setTotalPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(null);
    let [pagesToShow, setPagesToShow] = useState(null);
    
    const setPage = (page) => {
        if (page < 1) {
            page = 1;
        } else if (page > totalPages) {
            page = totalPages;
        }
        
        setCurrentPage(page);
        
        const startIndex = (page - 1) * pageLimit;
        const endIndex = Math.min(startIndex + pageLimit - 1, totalElements - 1);
        
        props.onChangePage({
            pageLimit,
            totalPages,
            page,
            startIndex,
            endIndex
        });
    };
    
    const getPager = () => {
        let pages = [], startFromNumber;
        
        if (totalPages <= pagesToShow) {
            startFromNumber = 1;
            pagesToShow = totalPages;
        } else {
            if (currentPage <= Math.ceil(pagesToShow / 2)) {
                startFromNumber = 1;
            } else if (currentPage + Math.floor((pagesToShow - 1) / 2) >= totalPages) {
                startFromNumber = totalPages - (pagesToShow - 1);
            } else {
                startFromNumber = currentPage - Math.floor(pagesToShow / 2);
            }
        }
        
        for (let i = 1; i <= pagesToShow; i++) {
            pages.push(startFromNumber++);
        }
        
        return {
            currentPage,
            totalPages,
            pages
        };
    }
    
    useEffect(() => {
        setTotalElements(props.totalElements);
        setPageLimit(props.pageLimit || 10);
        setTotalPages(props.totalPages);
        setPagesToShow(props.pagesToShow || 5);
        setCurrentPage(props.currentPage || 1);
    }, [props.currentPage, props.pageLimit, props.pagesToShow, props.totalElements, props.totalPages]);
    
    useEffect(() => {
        if (currentPage) {
            setPage(currentPage);
        }
    }, []);
    
    if (!totalElements || totalPages === 1) {
        return null;
    }
    
    const pager = getPager();
    
    return (
        <MDBPagination circle className='my-4 float-right'>
            <MDBPageItem disabled={pager.currentPage === 1} onClick={() => setPage(1)}>
                <MDBPageNav className='page-link' aria-label='First' >
                    First <span className='sr-only'>First</span>
                </MDBPageNav>
            </MDBPageItem>
            <MDBPageItem
                disabled={pager.currentPage === 1}
                onClick={() => setPage(pager.currentPage - 1)}
            >
                <MDBPageNav className='page-link' aria-label='Previous'>
                    <span aria-hidden='true'>&laquo;</span>
                    <span className='sr-only'>Previous</span>
                </MDBPageNav>
            </MDBPageItem>
            {pager.pages.map((page, index) => (
                <MDBPageItem
                    key={index}
                    active={pager.currentPage === page}
                    onClick={() => setPage(page)}
                >
                    <MDBPageNav className='page-link'>{page}</MDBPageNav>
                </MDBPageItem>
            ))}
            <MDBPageItem
                disabled={pager.currentPage === pager.totalPages}
                onClick={() => setPage(pager.currentPage + 1)}
            >
                <MDBPageNav className='page-link' aria-label='Next'>
                    <span aria-hidden='true'>&raquo;</span>
                    <span className='sr-only'>Next</span>
                </MDBPageNav>
            </MDBPageItem>
            <MDBPageItem
                disabled={pager.currentPage === pager.totalPages}
                onClick={() => setPage(pager.totalPages)}
            >
                <MDBPageNav className='page-link' aria-label='Last'>
                    Last <span className='sr-only'>Last</span>
                </MDBPageNav>
            </MDBPageItem>
        </MDBPagination>
    );
};

export default Pagination;
