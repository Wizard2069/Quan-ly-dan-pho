import React from "react";
import { MDBInput, MDBCol } from "mdbreact";

const SearchPage = () => {
    return (
        <MDBCol md="6">
            <MDBInput hint="Tìm nhân khẩu" type="text" containerClass="mt-0" />
        </MDBCol>
    );
}

export default SearchPage;