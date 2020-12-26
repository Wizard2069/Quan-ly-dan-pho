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
        default:
    }
};
