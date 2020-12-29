import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import HouseholdForm from '../../../components/Form/Household/HouseholdForm';
import {getHouseholdById} from '../../../store/actions/households';
import Input from '../../../components/Input/Input';
import FamilyMemberTable from '../../../components/Table/FamilyMember/FamilyMemberTable';
import CorrectionTable from '../../../components/Table/Correction/CorrectionTable';
import LeaveModal from '../../../components/Modal/Household/LeaveModal';
import {toVnDateFormat} from '../../../utils/utils';
import SeparateHousehold from './SeparateHousehold';
import HouseholdHistoryTable from '../../../components/Table/HouseholdHistory/HouseholdHistoryTable';

const HouseholdDetail = () => {
    const {id} = useParams();
    const householdData = useSelector(state => state.household);
    const dispatch = useDispatch();
    
    const [initialValues, setInitialValues] = useState(null);
    
    const [modal, setModal] = useState(false);
    
    const [hostName, setHostName] = useState(null);
    const [createdDay, setCreatedDay] = useState(null);
    
    useEffect(() => {
        dispatch(getHouseholdById(id));
    }, [dispatch, id]);
    
    useEffect(() => {
        if (householdData.id) {
            setInitialValues({
                areaCode: householdData.areaCode,
                address: householdData.address
            });
            setHostName(householdData.host.info.fullName);
            setCreatedDay(householdData.createdDay);
        }
    }, [householdData]);
    
    const extraCols = (
        <>
            {householdData.leaveDay ?
                <>
                    <Input
                        disabled={true}
                        name={householdData.leaveDay}
                        label='Ngày chuyển đi'
                        value={toVnDateFormat(householdData.leaveDay)}
                    />
                    <Input
                        disabled={true}
                        name={householdData.leaveReason}
                        label='Lý do chuyển'
                        value={householdData.leaveReason}
                    />
                </> : null
            }
            <Input
                disabled={true}
                name={householdData.householdCode}
                label='Mã hộ khẩu'
                value={householdData.householdCode}
            />
        </>
    );
    
    const handleToggle = () => {
        setModal(prevModal => !prevModal);
    };
    
    let householdDetail;
    if (initialValues === null) {
        householdDetail = null;
    } else {
        householdDetail = (
            <HouseholdForm
                edit={false}
                title='Chi tiết hộ khẩu'
                host={hostName}
                initialValues={initialValues}
                date={createdDay}
                extraCols={extraCols}
                handleLeaveToggle={handleToggle}
            />
        );
    }
    
    return (
        <>
            {householdDetail}
            <LeaveModal
                modal={modal}
                toggle={handleToggle}
                householdId={id}
            />
            <FamilyMemberTable
                householdId={id}
            />
            <CorrectionTable
                householdId={id}
            />
            <section style={{marginTop: '50px'}}>
                <SeparateHousehold
                    householdId={id}
                />
            </section>
            <HouseholdHistoryTable
                householdId={id}
            />
        </>
    );
};

export default React.memo(HouseholdDetail);
