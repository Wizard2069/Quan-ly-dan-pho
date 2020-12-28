import React from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

import PersonForm from '../../components/Form/Person/PersonForm';
import {createPerson} from '../../store/actions/people';

const AddPerson = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    
    const initialValues = {
        fullName: '',
        alias: '',
        birthPlace: '',
        domicile: '',
        nation: '',
        religion: '',
        nationality: '',
        passportNumber: '',
        permanentAddress: '',
        currentAddress: '',
        academicLevel: '',
        qualification: '',
        ethnicLanguage: '',
        languageLevel: '',
        job: '',
        workplace: '',
        criminalRecord: '',
        note: ''
    };
    
    const handleSubmit = (personDto) => {
        dispatch(createPerson(personDto));
        history.push('/people/list');
        history.go(0);
    };
    
    return (
        <PersonForm
            initialValues={initialValues}
            edit={true}
            title='Thêm nhân khẩu'
            extraCols={null}
            btnTitle='Thêm'
            onHandleSubmit={handleSubmit}
        />
    );
};

export default AddPerson;
