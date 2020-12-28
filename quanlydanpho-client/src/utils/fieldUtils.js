export const fieldsToVietnamese = (field) => {
    switch (field) {
        case 'fullName':
            return 'Họ và tên';
        case 'alias':
            return 'Biệt danh';
        case 'birthPlace':
            return 'Nơi sinh';
        case 'domicile':
            return 'Nguyên quán';
        case 'nation':
            return 'Dân tộc'
        case 'religion':
            return 'Tôn giáo';
        case 'nationality':
            return 'Quốc tịch';
        case 'passportNumber':
            return 'Số hộ chiếu';
        case 'permanentAddress':
            return 'Nơi thường trú';
        case 'currentAddress':
            return 'Địa chỉ hiện tại';
        case 'academicLevel':
            return 'Trình độ học vấn';
        case 'qualification':
            return 'Trình độ chuyên môn';
        case 'ethnicLanguage':
            return 'Biết tiếng dân tộc';
        case 'languageLevel':
            return 'Trình độ ngoại ngữ';
        case 'job':
            return 'Nghề nghiệp';
        case 'workplace':
            return 'Nơi làm việc';
        case 'criminalRecord':
            return 'Tiền án';
        case 'note':
            return 'Ghi chú';
        case 'idCardNumber':
            return 'Số chứng minh thư';
        case 'tempResidentPlace':
            return 'Nơi tạm trú';
        case 'reason':
            return 'Lý do';
        case 'phoneNumber':
            return 'Số điện thoại';
        case 'issuedPlace':
            return 'Nơi cấp';
        case 'issuedDay':
            return 'Ngày cấp';
        case 'address':
            return 'Địa chỉ';
        case 'deathCertNumber':
            return 'Số giấy chứng tử';
        case 'declaredPersonIdCardNumber':
            return 'Số chứng minh thư người khai';
        case 'deathPersonCode':
            return 'Mã nhân khẩu người chết';
        case 'deathReason':
            return 'Nguyên nhân chết';
        case 'username':
            return 'Tên tài khoản';
        case 'email':
            return 'Email';
        case 'password':
            return 'Mật khẩu';
        default:
    }
};
