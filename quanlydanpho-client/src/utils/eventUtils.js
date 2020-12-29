export const eventToVietnamese = (event) => {
    switch (event) {
        case 'NEW':
            return 'Nhân khẩu mới';
        case 'DEATH':
            return 'Nhân khẩu chết';
        case 'STAY':
            return 'Tạm trú';
        case 'TEMP_ABSENT':
            return 'Tạm vắng';
        case 'SEPARATE':
            return 'Tách hộ';
        default:
    }
};
