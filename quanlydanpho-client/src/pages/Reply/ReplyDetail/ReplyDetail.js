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
import PetitionDetail from '../../Petition/PetitionDetail/PetitionDetail';

const ReplyDetail = (props) => {
    const {id} = useParams();
    
    useEffect(() => {
        props.handleGetReply(id);
    }, [id]);
    
    let replyBody = null;
    
    if (props.replyData.id) {
        replyBody = (
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
                                <strong>{props.replyData.body.subject}</strong>
                            </h3>
                            <p>
                                {parse(props.replyData.body.content)}
                            </p>
                            <p>
                                Gửi bởi <span>
                                    <strong>{props.replyData.replier.username}</strong>
                                </span>
                                , {toVnDateFormat(props.replyData.body.date)}
                            </p>
                            <p className='mb-0 text-right'>
                                <h6 className="font-weight-bold mb-0">
                                    Trạng thái: {statusToVietnamese(props.replyData.body.status)}
                                </h6>
                            </p>
                        </MDBCol>
                    </MDBRow>
                    {props.manager && !props.pended ?
                        <MDBRow className='mt-5'>
                            <MDBCol className='text-right'>
                                <MDBBtn color='success' onClick={() => props.handleAcceptReplyClick(id)}>
                                    Duyệt
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
            {replyBody}
            <section>
                <p>Trả lời đến: </p>
                <PetitionDetail
                    petitionData={props.replyData?.petition}
                    handleGetPetition={() => {}}
                />
            </section>
        </>
    );
}

export default ReplyDetail;
