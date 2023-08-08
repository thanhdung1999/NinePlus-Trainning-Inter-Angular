import { ROUTER } from './router.contanst';

export const menuProfile = [
    {
        lang: 'vn',
        menu: [
            {
                icon: 'pi pi-cog',
                label: 'Tài khoản',
                items: [
                    {
                        label: 'Profile',
                        routerLink: ROUTER.PROFILE,
                        visible: false,
                    },
                    {
                        label: 'Thay đổi mật khẩu',
                        routerLink: ROUTER.CHANGE_PASSWORD,
                        visible: false,
                    },
                ],
            },
            {
                icon: 'pi pi-book',
                label: 'Dịch vụ',
                items: [],
            },
            {
                icon: 'pi pi-ticket',
                label: 'Khuyến mãi',
                items: [],
            },
        ],
    },
    {
        lang: 'en',
        menu: [
            {
                icon: 'pi pi-cog',
                label: 'My Account',
                items: [
                    {
                        label: 'Profile',
                        routerLink: ROUTER.PROFILE,
                        visible: false,
                    },
                    {
                        label: 'Change password',
                        routerLink: ROUTER.CHANGE_PASSWORD,
                        visible: false,
                    },
                ],
            },
            {
                icon: 'pi pi-book',
                label: 'My Booking',
                items: [],
            },
            {
                icon: 'pi pi-ticket',
                label: 'Vouchers',
                items: [],
            },
        ],
    },
];
