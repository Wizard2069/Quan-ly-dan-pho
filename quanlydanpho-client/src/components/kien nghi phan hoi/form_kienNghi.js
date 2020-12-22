import React from 'react'
import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow, MDBView} from "mdbreact";

const Form_kienNghi = () => {
    return (
    <>
        <MDBContainer>
            <MDBRow>
                <MDBCol md={10} className='offset-md-1'>
                    <MDBCard className='center'>
                        <MDBCardBody >
                            <MDBInput
                                type="textarea"
                                label="Người nhận"
                                rows="1"
                                icon="pencil-alt"
                            />
                            <MDBInput
                                type="textarea"
                                label="Chủ đề   "
                                rows="1"
                                icon="pencil-alt"
                            />
                            <div className="input-group">
                                <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon">
            <i className="fas fa-pencil-alt prefix"></i>
            </span>
                                </div>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="10"></textarea>
                            </div>
                            <div className='text-center'>
                                <MDBBtn color='light-blue'>Submit</MDBBtn>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>

        </>

    )
}

export default Form_kienNghi;
