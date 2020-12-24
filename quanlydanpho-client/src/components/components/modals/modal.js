import React, { Component } from 'react';
import {
    MDBContainer,
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter,
    MDBRow,
    MDBIcon,
    MDBInput
} from 'mdbreact';
import SearchPage from "../search/search";

class ModalPage extends Component {
    state = {
        modal: false
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <MDBContainer>
                <div>
                    <MDBInput style={{width:'20rem'}} label='Chủ hộ' className='d-inline'>
                        <MDBIcon className='d-inline' onClick={this.toggle} icon='edit'/>
                    </MDBInput>
                </div>

                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalHeader toggle={this.toggle}>Tìm kiếm</MDBModalHeader>
                    <MDBModalBody>
                        <MDBRow>
                            <SearchPage/>
                        </MDBRow>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                        <MDBBtn color="primary">Save changes</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export default ModalPage;