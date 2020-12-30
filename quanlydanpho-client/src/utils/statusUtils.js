export const statusToVietnamese = (status) => {
    switch (status) {
        case 'PENDING':
            return 'Đang chờ xử lý';
        case 'REJECTED':
            return 'Đã từ chối';
        case 'WAIT_FOR_REPLY':
            return 'Đang chờ phản hồi';
        case 'REPLIED':
            return 'Đã được phản hồi';
        case 'SENT_TO_USER':
            return 'Đã phản hồi';
        default:
    }
};
