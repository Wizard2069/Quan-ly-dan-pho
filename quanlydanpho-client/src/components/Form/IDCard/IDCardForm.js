import React, {useEffect, useState} from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBRow,
    MDBView
} from 'mdbreact';
import {useDispatch, useSelector} from 'react-redux';

import {getIdCardByPersonId} from '../../../store/actions/idCard';
import AddIDCardForm from './AddIDCardForm';
import EditIDCardForm from './EditIDCardForm';

const IDCardForm = (props) => {
    const idCardData = useSelector(state => state.idCard);
    const dispatch = useDispatch();
    
    const [addIdCard, setAddIdCard] = useState(false);
    
    useEffect(() => {
        dispatch(getIdCardByPersonId(props.personId));
    }, [dispatch, props.personId]);
    
    useEffect(() => {
        if (idCardData.id) {
            setAddIdCard(true);
        }
    }, [idCardData]);
    
    let idCardFormBody;
    if (addIdCard) {
        if (idCardData.id) {
            idCardFormBody = (
                <EditIDCardForm
                    idCardData={idCardData}
                />
            );
        } else {
            idCardFormBody = (
                <AddIDCardForm
                    handleCancelAdd={() => setAddIdCard(false)}
                    personId={props.personId}
                />
            );
        }
    } else {
        idCardFormBody = (
            <MDBRow>
                <MDBCol className='text-center'>
                    <MDBBtn color='primary' onClick={() => setAddIdCard(true)}>
                        Thêm mới
                    </MDBBtn>
                </MDBCol>
            </MDBRow>
        );
    }
    
    return (
        <section>
            <MDBCard narrow className='pb-3' style={{marginTop: '50px'}}>
                <MDBView
                    cascade
                    className='gradient-card-header blue-gradient narrower py-2 mx-4 mb-3'
                >
                    <MDBRow>
                        <MDBCol md='6' className="d-flex justify-content-center align-items-center offset-md-3">
                            <h3 className='white-text mx-3 mb-0'>
                                Chứng minh thư
                            </h3>
                        </MDBCol>
                    </MDBRow>
                </MDBView>
            
                <MDBCardBody>
                    {idCardFormBody}
                </MDBCardBody>
            </MDBCard>
        </section>
    );
};

export default IDCardForm;
