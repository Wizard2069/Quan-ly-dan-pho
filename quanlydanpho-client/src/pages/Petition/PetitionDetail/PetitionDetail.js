import React, {useEffect} from "react";
import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody, MDBBtn
} from "mdbreact";
import {useParams} from 'react-router-dom';
import parse from 'html-react-parser';

import {toVnDateFormat} from '../../../utils/utils';
import {statusToVietnamese} from '../../../utils/statusUtils';

const PetitionDetail = (props) => {
    const {id} = useParams();
    
    useEffect(() => {
        props.handleGetPetition(id);
    }, [id]);
    
    let petitionBody = null;
    
    if (props.petitionData?.id) {
        petitionBody = (
            <MDBCard className="my-5 px-5">
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol lg="8" className='offset-lg-2'>
                            <p className="green-text">
                                <h6 className="font-weight-bold mb-3">
                                    Tiêu đề
                                </h6>
                            </p>
                            <h3 className="font-weight-bold mb-3 p-0">
                                <strong>{props.petitionData.body.subject}</strong>
                            </h3>
                            <p>
                                {parse(props.petitionData.body.content)}
                            </p>
                            <p>
                                Gửi bởi <span>
                                    <strong>{props.petitionData.sender.username}</strong>
                                </span>
                                , {toVnDateFormat(props.petitionData.body.date)}
                            </p>
                            <p className='mb-0 text-right'>
                                <h6 className="font-weight-bold mb-0">
                                    Trạng thái: {statusToVietnamese(props.petitionData.body.status)}
                                </h6>
                            </p>
                        </MDBCol>
                    </MDBRow>
                    {props.manager && !props.pended ?
                        <MDBRow className='mt-5'>
                            <MDBCol className='text-right'>
                                <MDBBtn color='danger' onClick={() => props.handleRejectPetitionClick(id)}>
                                    Từ chối
                                </MDBBtn>
                                <MDBBtn color='success' onClick={() => props.handleAcceptPetitionClick(id)}>
                                    Duyệt
                                </MDBBtn>
                            </MDBCol>
                        </MDBRow> : null
                    }
                    {props.president && !props.replied ?
                        <MDBRow className='mt-5'>
                            <MDBCol className='text-right'>
                                <MDBBtn color='primary' onClick={() => props.handleReplyClick(id)}>
                                    Trả lời
                                </MDBBtn>
                            </MDBCol>
                        </MDBRow> : null
                    }
                </MDBCardBody>
            </MDBCard>
        );
    }
    
    return (
        <>
            {petitionBody}
        </>
    );
}

export default PetitionDetail;
