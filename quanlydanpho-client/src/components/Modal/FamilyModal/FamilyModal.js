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
import {addFamilyByPersonId} from '../../../store/actions/family';

const FamilyModal = (props) => {
    const history = useHistory();
    const peopleData = useSelector(state => state.people);
    const dispatch = useDispatch();
    
    const [ids, setIds] = useState([]);
    const [keyword, setKeyword] = useState(null);
    
    const [value] = useDebounce(keyword, 500);
    
    const [next, setNext] = useState(false);
    const [relation, setRelation] = useState({
        memberId: null,
        memberRelation: null
    });
    const [relations, setRelations] = useState([]);
    
    const handleOnCheck = (e) => {
        if (e.target.checked && !ids.includes(e.target.id, 0)) {
            setIds([
                ...ids,
                e.target.id
            ]);
        }
    };
    
    const handleOnChangeSearchValue = (value) => {
        setKeyword(value);
    };
    
    const handleOnClose = () => {
        props.toggle();
        setKeyword('');
        setNext(false);
    };
    
    const handleOnDone = () => {
        relations.push(relation);
        dispatch(addFamilyByPersonId(props.personId, relations));
        props.toggle();
        setNext(false);
        history.go(0);
    };
    
    const handleOnRelationChange = (e, personId) => {
        e.persist();
        setRelation(prevRelation => {
            if (prevRelation.memberId !== personId && prevRelation.memberId !== null) {
                setRelations([
                    ...relations,
                    prevRelation
                ]);
            }
    
            return {
                memberId: personId,
                memberRelation: e.target.value
            };
        });
    };
    
    useEffect(() => {
        if (props.modal) {
            dispatch(getPeople(1, 10, null, null, value, 'code'));
        }
    }, [dispatch, props.modal, value]);

    let personList = [];
    let people;
    let familyBody = [];

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
                familyBody.push(
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
                                label='Quan hệ với nhân khẩu'
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
                        {familyBody}
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

export default React.memo(FamilyModal);
