import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { isEmpty } from 'lodash';
import { MenuItem } from 'primeng/api';
import { TranslationService } from 'src/app/modules/i18n';
import { menuProfile } from 'src/app/shared/constants/menu-profile';
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

    constructor(private _router: Router, private _translationService: TranslationService) {}

    ngOnInit(): void {
        this.initMenu();
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

    navigateAndToggleMenuItem(path: string, indexItem: number, indexMenuItem: number) {
        this.initMenu();
        if (!isEmpty(this.menus[indexItem].items)) {
            this.menus[indexItem].items = this.menus[indexItem].items?.map((item, index) => {
                if (index === indexMenuItem) {
                    item.visible = true;
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
