import { Component } from '@angular/core';
import { isEmpty, isNil } from 'lodash';
import { AuthenticateService, SessionService } from 'src/app/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    isPopupLogin = false;

    isAuth = false;

    constructor(private _layoutService: LayoutService, private _sessionService: SessionService, private _authenticateService: AuthenticateService) {}

    ngOnInit(): void {
        this.getRole();
    }

    getRole() {
        if (!isNil(this._sessionService.userInformation) && !isEmpty(this._sessionService.userInformation)) {
            this.isAuth = true;
        }
    }

    get colorScheme(): string {
        return this._layoutService.config.colorScheme;
    }

    get layoutTheme(): string {
        return this._layoutService.config.layoutTheme;
    }

    get logo(): string {
        const path = 'assets/layout/images/logo-';
        const logo = this.layoutTheme === 'primaryColor' ? 'light.png' : this.colorScheme === 'light' ? 'dark.png' : 'light.png';
        return path + logo;
    }

    hidePopupLogin() {
        this.isPopupLogin = false;
        document.body.style['overflow'] = 'unset';
    }
    showPopupLogin() {
        this.isPopupLogin = true;
        document.body.style['overflow'] = 'hidden';
    }
}
