import React from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import HouseholdForm from '../../../components/Form/Household/HouseholdForm';
import {separateHouseholdById} from '../../../store/actions/households';

const SeparateHousehold = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    
    const initialValues = {
        areaCode: '',
        address: ''
    };
    
    const onSubmit = (householdBody) => {
        dispatch(separateHouseholdById(props.householdId, householdBody));
        history.push('/households/list');
        history.go(0);
    };
    
    return (
        <HouseholdForm
            edit={true}
            title='Tách hộ'
            initialValues={initialValues}
            onHandleSubmit={onSubmit}
        />
    );
};

export default SeparateHousehold;
