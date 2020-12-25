import React from 'react';
import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCardImage,
    MDBBtn
} from 'mdbreact';
import ModalPage from "../components/modals/modal";

class FormAddHousehold extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            maHoKhau:'',
            maKhuVuc:'',
            diaChi:'',
            ngayLap:'',
            ngayChuyenDi:'',
            lyDoChuyen:'',
            nguoiThucHien:'',
        };
    }

    submitHandler = event => {
        event.preventDefault();
        event.target.className += ' was-validated';
    };

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        return (
            <section>
                <MDBCard narrow className='mb-5'>
                    <MDBCardImage
                        className='view view-cascade gradient-card-header blue-gradient'
                        cascade
                        tag='div'
                    >
                        <h2 className='h2-responsive mb-2'>Thêm hộ khẩu</h2>
                    </MDBCardImage>
                    <MDBCardBody cascade>
                        <form
                            className='needs-validation'
                            onSubmit={this.submitHandler}
                            noValidate
                        >
                            <MDBRow>
                                <MDBCol md='4'>
                                    <MDBInput
                                        outline
                                        value={this.state.maHoKhau}
                                        name='maHoKhau'
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterEmailEx2'
                                        label='Mã hộ khẩu'
                                        required
                                    >
                                        <div className='valid-feedback ml-4 pl-3'>Looks good!</div>
                                    </MDBInput>
                                </MDBCol>
                                <MDBCol>
                                    <ModalPage/>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md='4'>
                                    <MDBInput
                                        outline
                                        value={this.state.maKhuVuc}
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterPasswordEx4'
                                        name='maKhuVuc'
                                        label='Mã khu vực'
                                        required
                                    >
                                        <div className='invalid-feedback ml-4 pl-3'>
                                            Please provide a valid city.
                                        </div>
                                        <div className='valid-feedback ml-4 pl-3'>Looks good!</div>
                                    </MDBInput>
                                </MDBCol>
                                <MDBCol md='4'>
                                    <MDBInput
                                        outline
                                        value={this.state.diaChi}
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterPasswordEx4'
                                        name='diaChi'
                                        label='Địa chỉ'
                                        required
                                    >
                                        <div className='invalid-feedback ml-4 pl-3'>
                                            Please provide a valid state.
                                        </div>
                                        <div className='valid-feedback ml-4 pl-3'>Looks good!</div>
                                    </MDBInput>
                                </MDBCol>
                                <MDBCol md='4'>
                                    <MDBInput
                                        outline
                                        value={this.state.ngayLap}
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterPasswordEx4'
                                        name='ngayLap'
                                        label='Ngày lập'
                                        required
                                    >
                                        <div className='invalid-feedback ml-4 pl-3'>
                                            Please provide a valid zip.
                                        </div>
                                        <div className='valid-feedback ml-4 pl-3'>Looks good!</div>
                                    </MDBInput>
                                </MDBCol>
                                <MDBCol md='4'>
                                    <MDBInput
                                        outline

                                        value={this.state.ngayChuyenDi}
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterPasswordEx4'
                                        name='ngayChuyenDi'
                                        label='Ngày chuyển đi'
                                        required
                                    >
                                        <div className='invalid-feedback ml-4 pl-3'>
                                            Please provide a valid zip.
                                        </div>
                                        <div className='valid-feedback ml-4 pl-3'>Looks good!</div>
                                    </MDBInput>
                                </MDBCol>
                                <MDBCol md='4'>
                                    <MDBInput
                                        outline
                                        value={this.state.lyDoChuyen}
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterPasswordEx4'
                                        name='lyDoChuyen'
                                        label='Lý do chuyển'
                                        required
                                    >
                                        <div className='invalid-feedback ml-4 pl-3'>
                                            Please provide a valid zip.
                                        </div>
                                        <div className='valid-feedback ml-4 pl-3'>Looks good!</div>
                                    </MDBInput>
                                </MDBCol>
                                <MDBCol md='4'>
                                    <MDBInput
                                        outline
                                        value={this.state.nguoiThucHien}
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterPasswordEx4'
                                        name='nguoiThucHien'
                                        label='Người thực hiện'
                                        required
                                    >
                                        <div className='invalid-feedback ml-4 pl-3'>
                                            Please provide a valid zip.
                                        </div>
                                        <div className='valid-feedback ml-4 pl-3'>Looks good!</div>
                                    </MDBInput>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md='3' className='offset-md-5'>
                                    <MDBBtn color='primary' type='submit'>
                                        Lưu thay đổi
                                    </MDBBtn>
                                </MDBCol>
                            </MDBRow>
                        </form>
                    </MDBCardBody>
                </MDBCard>
            </section>
        );
    }
}

export default FormAddHousehold;
