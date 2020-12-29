import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import PersonForm from '../../../components/Form/Person/PersonForm';
import {getPersonById, updatePersonById} from '../../../store/actions/people';
import {toVnDateFormat, toVnSex} from '../../../utils/utils';
import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBRow, MDBTable, MDBTableBody, MDBView} from 'mdbreact';
import TableHeader from '../../../components/Table/TableHeader/TableHeader';
import Select from '../../../components/Select/Select';
import Input from '../../../components/Input/Input';
import {getFamilyByPersonId} from '../../../store/actions/family';
import Pagination from '../../../components/Pagination/Pagination';
import FamilyModal from '../../../components/Modal/Family/FamilyModal';
import IDCardForm from '../../../components/Form/IDCard/IDCardForm';
import StoryTable from '../../../components/Table/Story/StoryTable';
import LeaveModal from '../../../components/Modal/People/LeaveModal';

const PersonDetail = () => {
    const {id} = useParams();
    const person = useSelector(state => state.person);
    const familyData = useSelector(state => state.family);
    const dispatch = useDispatch();
    
    const [edit, setEdit] = useState(false);
    const [initialValues, setInitialValues] = useState(null);
    const [update, setUpdate] = useState(false);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(null);
    
    const [modal, setModal] = useState(false);
    const [leaveModal, setLeaveModal] = useState(false);
    
    useEffect(() => {
         dispatch(getPersonById(id));
         dispatch(getFamilyByPersonId(id, currentPage, pageLimit));
    }, [dispatch, currentPage, pageLimit, id]);
    
    useEffect(() => {
        if (person.id) {
            if (edit && update) {
                setEdit(false);
                setUpdate(false);
            }
            
            setInitialValues({
                fullName: person.info.fullName,
                alias: person.alias,
                birthPlace: person.birthPlace,
                domicile: person.extraInfo.domicile,
                nation: person.extraInfo.nation,
                religion: person.extraInfo.religion,
                nationality: person.extraInfo.nationality,
                passportNumber: person.passportNumber,
                permanentAddress: person.permanentAddress,
                currentAddress: person.info.currentAddress,
                academicLevel: person.educationInfo.academicLevel,
                qualification: person.educationInfo.qualification,
                ethnicLanguage: person.educationInfo.ethnicLanguage,
                languageLevel: person.educationInfo.languageLevel,
                job: person.info.job,
                workplace: person.educationInfo.workplace,
                criminalRecord: person.educationInfo.criminalRecord,
                note: person.note
            });
        }
    }, [person, edit, update]);
    
    const handleSubmit = (personDto) => {
        dispatch(updatePersonById(id, personDto));
        setUpdate(true);
    };
    
    const handleLeaveToggle = () => {
        setLeaveModal(prevLeaveModal => !prevLeaveModal);
    };
    
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
    
    let personDetail;
    const extraCols = (
        <>
            {person.mobilization ?
                <>
                    <Input
                        disabled={true}
                        name={person.mobilization.leaveDate}
                        label='Ngày chuyển đi'
                        value={person.mobilization.leaveDate}
                    />
                    <Input
                        disabled={true}
                        name={person.mobilization.newAddress}
                        label='Địa chỉ mới'
                        value={person.mobilization.newAddress}
                    />
                    <Input
                    disabled={true}
                    name={person.mobilization.leaveReason}
                    label='Lý do chuyển đi'
                    value={person.mobilization.leaveReason}
                    />
                </> : null
            }
            <Input
                disabled={true}
                name={person.peopleCode}
                label='Mã nhân khẩu'
                value={person.peopleCode}
            />
        </>
    );
    
    if (initialValues === null) {
        personDetail = null;
    } else {
        if (edit) {
            personDetail = (
                <PersonForm
                    initialValues={initialValues}
                    date={new Date(person.info.birthday)}
                    sex={toVnSex(person.info.sex)}
                    title='Chi tiết nhân khẩu'
                    edit={true}
                    btnTitle='Lưu lại'
                    onCancelClick={() => setEdit(false)}
                    onHandleSubmit={handleSubmit}
                    extraCols={extraCols}
                    handleLeaveToggle={handleLeaveToggle}
                />
            );
        } else {
            personDetail = (
                <PersonForm
                    initialValues={initialValues}
                    date={new Date(person.info.birthday)}
                    sex={toVnSex(person.info.sex)}
                    title='Chi tiết nhân khẩu'
                    edit={false}
                    onEditClick={() => setEdit(true)}
                    extraCols={extraCols}
                    handleLeaveToggle={handleLeaveToggle}
                />
            );
        }
        
        let familyList = [];
        let family;
        let pagination;
        
        if (familyData._embedded) {
            family = familyData._embedded.families;
            const paging = familyData.page;
            
            for (const member of family) {
                familyList.push(
                    <tr key={member.id}>
                        <td>{member.info.fullName}</td>
                        <td>{toVnDateFormat(member.info.birthday)}</td>
                        <td>{toVnSex(member.info.sex)}</td>
                        <td>{member.info.job}</td>
                        <td>{member.info.currentAddress}</td>
                        <td>{member.personRelation}</td>
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
                {personDetail}
                <LeaveModal
                    modal={leaveModal}
                    toggle={handleLeaveToggle}
                    personId={person.id}
                />
                <section>
                    <MDBCard narrow className='pb-3'>
                        <MDBView
                            cascade
                            className='gradient-card-header blue-gradient narrower py-2 mx-4 mb-3'
                        >
                            <MDBRow>
                                <MDBCol md='6' className="d-flex justify-content-center align-items-center offset-md-3">
                                    <h3 className='white-text mx-3 mb-0'>
                                        Gia đình
                                    </h3>
                                </MDBCol>
                                <MDBCol md='3'>
                                    <MDBBtn color='blue accent-3' onClick={handleToggle}>
                                        Thêm thành viên
                                    </MDBBtn>
                                </MDBCol>
                            </MDBRow>
                        </MDBView>
        
                        <MDBCardBody>
                            <MDBTable responsive hover>
                                <TableHeader fields={[
                                    'Họ tên',
                                    'Ngày sinh',
                                    'Giới tính',
                                    'Nghề nghiệp',
                                    'Địa chỉ hiện tại',
                                    'Quan hệ với nhân khẩu'
                                ]}/>
                
                                <MDBTableBody>
                                    {familyList}
                                </MDBTableBody>
                            </MDBTable>
                            <Select onSelectChange={handleSelectChange}/>
                            {pagination}
                        </MDBCardBody>
                    </MDBCard>
                </section>
                <FamilyModal
                    modal={modal}
                    toggle={handleToggle}
                    personId={id}
                />
                <IDCardForm
                    personId={id}
                />
                <StoryTable
                    personId={id}
                />
            </>
        );
    }
};

export default React.memo(PersonDetail);
