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
import LinkCard from '../LinkCard';

class Form_addpeople extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            maNhanKhau: '',
            hoTen: '',
            bietDanh: '',
            namSinh: '',
            gioiTinh:'',
            noiSinh:'',
            nguyenQuan:'',
            danToc:'',
            tonGiao:'',
            quocTich:'',
            soHoChieu:'',
            noiThuongTru:'',
            diaChiHienNay:'',
            trinhDoHocVan:'',
            trinhDoChuyenMon:'',
            bietTiengDanToc:'',
            trinhDoNgoaiNgu:'',
            ngheNGhiep:'',
            noiLamViec:'',
            tienAn:'',
            ngayChuyenDen:'',
            lyDoChuyenDen:'',
            ngayChuyenDi:'',
            lyDoChuyenDi:'',
            diaChiMoi:'',
            ngayTao:'',
            idNguoiTao:'',
            ngayXoa:'',
            idNguoiXoa:'',
            lyDoXoa:'',
            ghiChu:'',
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
                        <h2 className='h2-responsive mb-2'>Thêm nhân khẩu</h2>
                    </MDBCardImage>
                    <MDBCardBody cascade>
                        <form
                            className='needs-validation'
                            onSubmit={this.submitHandler}
                            noValidate
                        >
                            <MDBRow>
                                <MDBCol md='1'/>
                                <MDBCol md='2'>
                                    <MDBInput
                                        value={this.state.id}
                                        name='id'
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterNameExa'
                                        label='ID'
                                        required
                                    >
                                        <div className='invalid-feedback ml-4 pl-3'>
                                            Please provide a valid zip.
                                        </div>
                                        <div className='valid-feedback ml-4 pl-3'>Looks good!</div>
                                    </MDBInput>
                                </MDBCol>
                                <MDBCol md='4'/>
                                <MDBCol md='3'>
                                    <MDBInput
                                        value={this.state.maNhanKhau}
                                        name='maNhanKhau'
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterEmailEx2'
                                        label='Mã nhân khẩu'
                                        required
                                    >
                                        <div className='invalid-feedback ml-4 pl-3'>
                                            Please provide a valid zip.
                                        </div>
                                        <div className='valid-feedback ml-4 pl-3'>Looks good!</div>
                                        </MDBInput>
                                </MDBCol>
                                <MDBCol md='2'/>
                                <MDBCol md='1'/>
                                <MDBCol md='3'>
                                    <MDBInput
                                        value={this.state.hoTen}
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterConfirmEx3'
                                        name='hoTen'
                                        label='Họ và tên'
                                        required
                                    >
                                    </MDBInput>
                                </MDBCol>
                                <MDBCol md='3'/>
                                <MDBCol md='3'>
                                    <MDBInput
                                        value={this.state.bietDanh}
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterPasswordEx4'
                                        name='bietDanh'
                                        label='Biệt danh'
                                        required
                                    >
                                        <div className='invalid-feedback ml-4 pl-3'>
                                            Please provide a valid city.
                                        </div>
                                        <div className='valid-feedback ml-4 pl-3'>Looks good!</div>
                                    </MDBInput>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md={1}/>
                                <MDBCol md='2'>
                                    <MDBInput
                                        value={this.state.namSinh}
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterPasswordEx4'
                                        name='namSinh'
                                        label='Năm sinh'
                                        required
                                    >
                                        <div className='invalid-feedback ml-4 pl-3'>
                                            Please provide a valid state.
                                        </div>
                                        <div className='valid-feedback ml-4 pl-3'>Looks good!</div>
                                    </MDBInput>
                                </MDBCol>
                                <MDBCol md={2}/>
                                <MDBCol md='2'>
                                    <MDBInput
                                        value={this.state.gioiTinh}
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterPasswordEx4'
                                        name='gioiTinh'
                                        label='Giới tính'
                                        required
                                    >
                                        <div className='invalid-feedback ml-4 pl-3'>
                                            Please provide a valid zip.
                                        </div>
                                        <div className='valid-feedback ml-4 pl-3'>Looks good!</div>
                                    </MDBInput>
                                </MDBCol>
                                <MDBCol md={1}/>
                                <MDBCol md='3'>
                                    <MDBInput
                                        value={this.state.noiSinh}
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterPasswordEx4'
                                        name='noiSinh'
                                        label='Nơi sinh'
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
                                            value={this.state.nguyenQuan}
                                            onChange={this.changeHandler}
                                            type='text'
                                            id='materialFormRegisterPasswordEx4'
                                            name='nguyenQuan'
                                            label='Nguyên quán'
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
                                            value={this.state.danToc}
                                            onChange={this.changeHandler}
                                            type='text'
                                            id='materialFormRegisterPasswordEx4'
                                            name='danToc'
                                            label='Dân tộc'
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
                                            value={this.state.tonGiao}
                                            onChange={this.changeHandler}
                                            type='text'
                                            id='materialFormRegisterPasswordEx4'
                                            name='tonGiao'
                                            label='Tôn giáo'
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
                                        value={this.state.quocTich}
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterPasswordEx4'
                                        name='quocTich'
                                        label='Quốc tịch'
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
                                        value={this.state.soHoChieu}
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterPasswordEx4'
                                        name='soHoChieu'
                                        label='Số hộ chiếu'
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
                                        value={this.state.noiThuongTru}
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterPasswordEx4'
                                        name='noiThuongTru'
                                        label='Nơi thường trú'
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
                                        value={this.state.diaChiHienNay}
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterPasswordEx4'
                                        name='diaChiHienNay'
                                        label='Địa chỉ hiện nay'
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
                                        value={this.state.trinhDoHocVan}
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterPasswordEx4'
                                        name='trinhDoHocVan'
                                        label='Trình độ học vấn'
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
                                        value={this.state.trinhDoChuyenMon}
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterPasswordEx4'
                                        name='trinhDoChuyenMon'
                                        label='Trình độ chuyên môn'
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
                                        value={this.state.bietTiengDanToc}
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterPasswordEx4'
                                        name='bietTiengDanToc'
                                        label='Biết tiếng dân tộc'
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
                                        value={this.state.trinhDoNgoaiNgu}
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterPasswordEx4'
                                        name='trinhDoNgoaiNGu'
                                        label='Trình độ ngoại ngữ'
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
                                        value={this.state.ngheNGhiep}
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterPasswordEx4'
                                        name='ngheNghiep'
                                        label='Nghề nghiệp'
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
                                        value={this.state.noiLamViec}
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterPasswordEx4'
                                        name='noiLamViec'
                                        label='Nơi làm việc'
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
                                        value={this.state.tienAn}
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterPasswordEx4'
                                        name='tienAn'
                                        label='Tiền Án'
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
                                        value={this.state.ngayChuyenDen}
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterPasswordEx4'
                                        name='ngayChuyenDen'
                                        label='Ngày chuyển đến'
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
                                        value={this.state.lyDoChuyenDen}
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterPasswordEx4'
                                        name='lyDoChuyenDen'
                                        label='Lý do chuyển đến'
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
                                        value={this.state.lyDoChuyenDi}
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterPasswordEx4'
                                        name='lyDoChuyenDi'
                                        label='Lý do chuyển đi'
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
                                        value={this.state.diaChiMoi}
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterPasswordEx4'
                                        name='diaChiMoi'
                                        label='Địa chỉ mới'
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
                                        value={this.state.ngayTao}
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterPasswordEx4'
                                        name='ngayTao'
                                        label='Ngày tạo'
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
                                        value={this.state.idNguoiTao}
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterPasswordEx4'
                                        name='idNguoiTao'
                                        label='ID người tạo'
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
                                        value={this.state.ngayXoa}
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterPasswordEx4'
                                        name='ngayXoa'
                                        label='Ngày xóa'
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
                                        value={this.state.idNguoiXoa}
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterPasswordEx4'
                                        name='idNguoiXoa'
                                        label='ID người xóa'
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
                                        value={this.state.lyDoXoa}
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterPasswordEx4'
                                        name='lyDoXoa'
                                        label='Lý do xóa'
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
                                        value={this.state.ghiChu}
                                        onChange={this.changeHandler}
                                        type='text'
                                        id='materialFormRegisterPasswordEx4'
                                        name='ghiChu'
                                        label='Ghi chú'
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
                            <MDBBtn color='primary' type='submit' className='d-fl' >
                                Submit Form
                            </MDBBtn>
                        </form>
                    </MDBCardBody>
                </MDBCard>

            </section>
        );
    }
}

export default Form_addpeople;
