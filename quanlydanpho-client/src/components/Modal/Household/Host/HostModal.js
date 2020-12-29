import React, {useEffect, useState} from 'react';
import {
    MDBModal,
    MDBModalHeader,
    MDBRow,
    MDBModalBody,
    MDBModalFooter,
    MDBBtn,
    MDBCol,
    MDBInput,
    MDBTable,
    MDBTableBody
} from 'mdbreact';
import {useDispatch, useSelector} from 'react-redux';
import {useDebounce} from 'use-debounce';

import './HostModal.css';
import {getPeople} from '../../../../store/actions/people';
import {toVnDateFormat, toVnSex} from '../../../../utils/utils';
import TableHeader from '../../../Table/TableHeader/TableHeader';

const HostModal = (props) => {
    const peopleData = useSelector(state => state.people);
    const dispatch = useDispatch();
    
    const [id, setId] = useState(null);
    const [name, setName] = useState(null);
    const [keyword, setKeyword] = useState(null);
    
    const [value] = useDebounce(keyword, 500);
    
    useEffect(() => {
        if (props.modal) {
            dispatch(getPeople(1, 10, null, null, value, 'code'));
        }
    }, [dispatch, props.modal, value]);
    
    let personList = [];
    let people;
    
    const handleOnChangeSearchValue = (value) => {
        setKeyword(value);
    };
    
    const handleOnClick = (e, personId, fullName) => {
        setId(personId);
        setName(fullName);
        e.target.parentNode.className += ' tr-clicked';
    };
    
    const handleOnClose = () => {
        props.toggle();
        setKeyword('');
        setId(null);
        setName(null);
    };
    
    const handleOnDone = () => {
        props.handleOnDone(id, name);
        setKeyword('');
        setId(null);
        setName(null);
    };
    
    if (peopleData._embedded) {
        people = peopleData._embedded.people;
    
        for (const person of people) {
            personList.push(
                <tr
                    key={person.id}
                    style={{cursor: 'pointer'}}
                    onClick={(e) => handleOnClick(e, person.id, person.fullName)}
                >
                    <td>{person.peopleCode}</td>
                    <td>{person.fullName}</td>
                    <td>{toVnDateFormat(person.birthday)}</td>
                    <td>{toVnSex(person.sex)}</td>
                    <td>{person.job}</td>
                    <td>{person.currentAddress}</td>
                </tr>
            );
        }
    }
    
    return (
        <MDBModal centered size='lg' isOpen={props.modal} toggle={handleOnClose}>
            <MDBModalHeader toggle={handleOnClose}>Tìm kiếm</MDBModalHeader>
            <MDBModalBody>
                <MDBRow>
                    <MDBCol lg='4' md='6'>
                        <MDBInput
                            type='text'
                            icon='search'
                            label='Mã nhân khẩu'
                            getValue={handleOnChangeSearchValue}
                        />
                    </MDBCol>
                </MDBRow>
        
                <MDBTable responsive hover>
                    <TableHeader
                        fields={[
                            'Mã nhân khẩu',
                            'Họ tên',
                            'Ngày sinh',
                            'Giới tính',
                            'Nghề nghiệp',
                            'Địa chỉ hiện tại'
                        ]}
                    />
            
                    <MDBTableBody>
                        {personList}
                    </MDBTableBody>
                </MDBTable>
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color="secondary" onClick={handleOnClose}>Đóng</MDBBtn>
                <MDBBtn color="primary" onClick ={handleOnDone}>Chọn</MDBBtn>
            </MDBModalFooter>
        </MDBModal>
    );
};

export default React.memo(HostModal);
