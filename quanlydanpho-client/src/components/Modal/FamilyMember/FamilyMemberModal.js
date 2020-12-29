import React, {useEffect, useState} from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalHeader,
    MDBModalBody,
    MDBModalFooter,
    MDBTableBody,
    MDBTable,
    MDBInput,
    MDBCol,
    MDBRow
} from 'mdbreact';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useDebounce} from 'use-debounce';

import TableHeader from '../../Table/TableHeader/TableHeader';
import {getPeople} from '../../../store/actions/people';
import {toVnDateFormat, toVnSex} from '../../../utils/utils';
import {addFamilyMemberToHousehold} from '../../../store/actions/familyMembers';

const FamilyMemberModal = (props) => {
    const history = useHistory();
    const peopleData = useSelector(state => state.people);
    const familyMemberData = useSelector(state => state.familyMember);
    const dispatch = useDispatch();
    
    const [ids, setIds] = useState([]);
    const [keyword, setKeyword] = useState(null);
    
    const [value] = useDebounce(keyword, 500);
    
    const [next, setNext] = useState(false);
    const [member, setMember] = useState({
        id: null,
        hostRelation: null
    });
    const [members, setMembers] = useState([]);
    
    const handleOnCheck = (e) => {
        const foundId = ids.indexOf(e.target.id);
        
        if (e.target.checked) {
            if (foundId === -1) {
                setIds([
                    ...ids,
                    e.target.id
                ]);
            }
        } else {
            if (foundId !== -1) {
                ids.splice(foundId, 1);
                setIds(ids);
            }
        }
    };
    
    const handleOnChangeSearchValue = (value) => {
        setKeyword(value);
    };
    
    const handleOnClose = () => {
        props.toggle();
        setKeyword('');
        setNext(false);
        setIds([]);
    };
    
    const handleOnDone = () => {
        members.push(member);
        dispatch(addFamilyMemberToHousehold(props.householdId, members));
        props.toggle();
        setNext(false);
    };
    
    const handleOnRelationChange = (e, personId) => {
        e.persist();
        setMember(prevMember => {
            if (prevMember.id !== personId && prevMember.id !== null) {
                setMembers([
                    ...members,
                    prevMember
                ]);
            }
            
            return {
                id: personId,
                hostRelation: e.target.value
            };
        });
    };
    
    useEffect(() => {
        if (props.modal) {
            dispatch(getPeople(1, 10, null, null, value, 'code'));
        }
    }, [dispatch, props.modal, value]);
    
    useEffect(() => {
        if (familyMemberData._embedded) {
            history.go(0);
        }
    }, [familyMemberData]);
    
    let personList = [];
    let people;
    let familyMemberBody = [];
    
    if (peopleData._embedded) {
        people = peopleData._embedded.people;
        
        for (const person of people) {
            personList.push(
                <tr key={person.id}>
                    <th scope='row'>
                        <input
                            className='form-check-input'
                            type='checkbox'
                            id={person.id}
                            onChange={handleOnCheck}
                        />
                        <label
                            htmlFor={person.id}
                            className='form-check-label mr-2 label-table'
                        />
                    </th>
                    <td>{person.peopleCode}</td>
                    <td>{person.fullName}</td>
                    <td>{toVnDateFormat(person.birthday)}</td>
                    <td>{toVnSex(person.sex)}</td>
                    <td>{person.job}</td>
                    <td>{person.currentAddress}</td>
                </tr>
            );
            
            if (ids.includes(person.id.toString(), 0)) {
                familyMemberBody.push(
                    <MDBRow key={person.id}>
                        <MDBCol md='5'>
                            <MDBInput
                                disabled
                                outline
                                label='Họ tên'
                                valueDefault={person.fullName}
                            />
                        </MDBCol>
                        <MDBCol md='6'>
                            <MDBInput
                                outline
                                label='Quan hệ với chủ hộ'
                                onChange={(e) => handleOnRelationChange(e, person.id)}
                            />
                        </MDBCol>
                    </MDBRow>
                )
            }
        }
    }
    
    if (next) {
        return (
            <MDBModal centered size='lg' isOpen={props.modal} toggle={handleOnClose}>
                <MDBModalHeader toggle={handleOnClose}>Thêm thành viên</MDBModalHeader>
                <MDBModalBody>
                    <form>
                        {familyMemberBody}
                    </form>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={handleOnClose}>Đóng</MDBBtn>
                    <MDBBtn color="primary" onClick={handleOnDone}>Thêm</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        );
    } else {
        return (
            <MDBModal centered size='lg' isOpen={props.modal} toggle={props.toggle}>
                <MDBModalHeader toggle={props.toggle}>Thêm thành viên</MDBModalHeader>
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
                            checkbox={true}
                        />
                        
                        <MDBTableBody>
                            {personList}
                        </MDBTableBody>
                    </MDBTable>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={handleOnClose}>Đóng</MDBBtn>
                    <MDBBtn color="primary" onClick={() => setNext(true)}>Tiếp theo</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        );
    }
};

export default React.memo(FamilyMemberModal);
