import { ROUTER } from './router.contanst';
interface listNavbar {
    label: string;
    routerLink: string;
    items: string[];
}
export const listNavbar: listNavbar[] = [
    { label: 'Về chúng tôi', routerLink: ROUTER.LANDING, items: ['Đội ngũ bác sĩ', 'Thành tích'] },
    {
        label: 'Dịch vụ',
        routerLink: ROUTER.LANDING,
        items: ['Điều trị chăm sóc da', 'Điều trị cơ thể', 'Điêu trị da mặt', 'Chăm sóc tóc', 'Móng tay'],
    },
    { label: 'Sản phẩm', routerLink: ROUTER.LANDING, items: ['Mỹ phẩm', 'Chăm sóc tóc'] },
    { label: 'Các bài viết', routerLink: ROUTER.LANDING, items: ['Đánh giá', 'Hoạt động'] },
];
