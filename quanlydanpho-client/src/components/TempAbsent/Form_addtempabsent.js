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

class Form_addtempabsent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idNhanKhau:'',
            maGiayTamVang:'',
            noiTamTru:'',
            tuNgay_temp:'',
            denNgay_temp:'',
            lyDo_temp:'',
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
                        <h2 className='h2-responsive mb-2'>Thêm tạm vắng</h2>
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
                                        value={this.state.idNhanKhau}
                                        name='idNhanKhau'
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterNameEx'
                                        label='ID nhân khẩu'
                                        required
                                    >
                                        <div className='valid-feedback ml-4 pl-3'>Looks good!</div>
                                    </MDBInput>
                                </MDBCol>
                                <MDBCol md='4'>
                                    <MDBInput
                                        value={this.state.maGiayTamVang}
                                        name='maGiayTamVang'
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterEmailEx2'
                                        label='Mã giấy tạm vắng'
                                        required
                                    >
                                        <div className='valid-feedback ml-4 pl-3'>Looks good!</div>
                                    </MDBInput>
                                </MDBCol>
                                <MDBCol md='4'>
                                    <MDBInput
                                        value={this.state.noiTamTru}
                                        onChange={this.changeHandler}
                                        type='email'
                                        id='materialFormRegisterConfirmEx3'
                                        name='noiTamTru'
                                        label='Nơi tạm trú'
                                        required
                                    >
                                    </MDBInput>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md='4'>
                                    <MDBInput
                                        value={this.state.tuNgay_temp}
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterPasswordEx4'
                                        name='tuNGay_temp'
                                        label='Từ ngày'
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
                                        value={this.state.denNgay_temp}
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterPasswordEx4'
                                        name='denNgay_temp'
                                        label='Đến ngày'
                                        required
                                    >
                                        <div className='invalid-feedback ml-4 pl-3'>
                                            Please provide a valid state.
                                        </div>
                                        <div className='valid-feedback ml-4 pl-3'>Looks good!</div>
                                    </MDBInput
                                      >
                                </MDBCol>
                                <MDBCol md='4'>
                                    <MDBInput
                                        value={this.state.lyDo_temp}
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterPasswordEx4'
                                        name='lyDo_temp'
                                        label='Lý do'
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
                                <MDBInput
                                    type='checkbox'
                                    value='conditions'
                                    id='materialInvalidCheck'
                                    required
                                    label='Agree to terms and conditions'
                                >
                                    <div className='invalid-feedback'>
                                        You must agree before submitting.
                                    </div>
                                </MDBInput>
                            </MDBRow>
                            <MDBBtn color='primary' type='submit'>
                                Submit Form
                            </MDBBtn>
                        </form>
                    </MDBCardBody>
                </MDBCard>
            </section>
        );
    }
}

export default Form_addtempabsent;
