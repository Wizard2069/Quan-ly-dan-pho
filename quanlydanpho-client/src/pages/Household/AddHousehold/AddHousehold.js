import React from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import HouseholdForm from '../../../components/Form/Household/HouseholdForm';
import {createNewHousehold} from '../../../store/actions/households';

const AddHousehold = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    
    const initialValues = {
        areaCode: '',
        address: ''
    };
    
    const onSubmit = (householdBody) => {
        dispatch(createNewHousehold(householdBody));
        history.push('/households/list');
        history.go(0);
    };
    
    return (
        <HouseholdForm
            edit={true}
            title='Thêm hộ khẩu'
            initialValues={initialValues}
            onHandleSubmit={onSubmit}
        />
    );
};

export default AddHousehold;
