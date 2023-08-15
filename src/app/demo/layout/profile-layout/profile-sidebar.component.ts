import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { cloneDeep, isEmpty } from 'lodash';
import { MenuItem } from 'primeng/api';
import { SessionService } from 'src/app/core';
import { TranslationService } from 'src/app/modules/i18n';
import { menuProfile } from 'src/app/shared/constants/menu-profile';
import { ROLE } from 'src/app/shared/constants/role';
interface Toggle {
    toggle?: boolean;
}

@Component({
    selector: 'app-profile-sidebar',
    templateUrl: './profile-sidebar.component.html',
    styleUrls: ['./profile-sidebar.component.scss'],
})
export class ProfileSidebarComponent {
    menus: MenuItem[] = [];

    menuToggle: Toggle[] = [];

    isRoleCustomer = false;

    constructor(private _router: Router, private _translationService: TranslationService, private _sessionService: SessionService) {}

    ngOnInit(): void {
        this.initMenu();
        this.getRole();
    }

    initMenu() {
        const lang: string = this._translationService.getSelectedLanguage();

        menuProfile.forEach((item) => {
            if (item.lang === lang) {
                this.menus = item.menu as MenuItem[];
            }
        });
        this.menus.forEach((menu) => {
            let item: Toggle = {
                toggle: false,
            };
            this.menuToggle.push(item);
        });
    }

    getRole() {
        const role = this._sessionService.userAuthenticate?.role ? this._sessionService.userAuthenticate.role : '';
        if (role === ROLE.CUSTOMER) {
            this.isRoleCustomer = true;
        }
    }

    navigateAndToggleMenuItem(path: string, indexItem: number, indexMenuItem: number) {
        if (!isEmpty(this.menus[indexItem].items)) {
            this.menus = this.menus.map((item, i) => {
                item.items?.forEach((mItem, j) => {
                    if (item.items && item.items.length > 0) {
                        item.items[j].visible = false;
                    }
                });
                return item;
            });
            this.menus[indexItem].items = this.menus[indexItem].items?.map((item, index) => {
                if (index === indexMenuItem) {
                    item.visible = true;
                } else {
                    item.visible = false;
                }
                return item;
            });
        }
        this._router.navigate([path]);
    }

    toggleMenuItem(menu: MenuItem, index: number) {
        if (menu?.items && menu.items.length > 0) {
            this.menuToggle[index].toggle = !this.menuToggle[index].toggle;
        }
    }
}
