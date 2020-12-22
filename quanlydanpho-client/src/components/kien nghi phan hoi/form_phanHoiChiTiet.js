import React from "react";
import {  MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBIcon, MDBView, MDBBtn } from "mdbreact";

const Form_phanHoiChiTiet = () => {
    return (
        <MDBCard className="my-5 px-5 pb-5">
            <MDBCardBody>
                <MDBRow>
                    <MDBCol lg="8" className='offset-lg-2' >
                        <a href="#!" className="green-text">
                            <h6 className="font-weight-bold mb-3">
                                Tiêu đề
                            </h6>
                        </a>
                        <h3 className="font-weight-bold mb-3 p-0">
                            <strong>Title of the news</strong>
                        </h3>
                        <p>
                            Nam libero tempore, cum soluta nobis est eligendi optio cumque
                            nihil impedit quo minus id quod maxime placeat facere possimus,
                            omnis voluptas assumenda est, omnis dolor repellendus et aut
                            officiis debitis.
                        </p>
                        <p>
                            by
                            <a href="#!">
                                <strong>Carine Fox</strong>
                            </a>
                            , 19/08/2018
                        </p>
                    </MDBCol>
                </MDBRow>
                <hr className="my-5" />
                <MDBRow>
                    <MDBCol lg="8" className='offset-lg-2'>
                        <a href="#!" className="pink-text">
                            <h6 className="font-weight-bold mb-3">
                                Tiêu đề
                            </h6>
                        </a>
                        <h3 className="font-weight-bold mb-3 p-0">
                            <strong>Title of the news</strong>
                        </h3>
                        <p>
                            At vero eos et accusamus et iusto odio dignissimos ducimus qui
                            blanditiis praesentium voluptatum deleniti atque corrupti quos
                            dolores et quas molestias excepturi sint occaecati cupiditate
                            non provident.
                        </p>
                        <p>
                            by
                            <a href="#!">
                                <strong>Carine Fox</strong>
                            </a>
                            , 14/08/2018
                        </p>
                    </MDBCol>
                    <MDBCol lg="5">
                        <MDBView className="rounded z-depth-2 mb-lg-0 mb-4" hover waves>
                            <a href="#!">
                                <MDBMask overlay="white-slight" />
                            </a>
                        </MDBView>
                    </MDBCol>
                </MDBRow>
            </MDBCardBody>
        </MDBCard>
    );
}

export default Form_phanHoiChiTiet;