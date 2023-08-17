import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-default-layout',
    templateUrl: './default-layout.component.html',
    styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {
    constructor(private layoutService: LayoutService) {}

    ngOnInit(): void {
        window.scroll(0, 0);
    }

    scrollTo(viewChild: HTMLElement) {
        viewChild.scrollIntoView({ behavior: 'smooth' });
    }

    get backgroundStyle(): object {
        let path = 'assets/demo/images/landing/';
        let image = this.layoutService.config.colorScheme === 'dark' ? 'line-effect-dark.svg' : 'line-effect.svg';

        return { 'background-image': 'url(' + path + image + ')' };
    }

    get colorScheme(): string {
        return this.layoutService.config.colorScheme;
    }

    get layoutTheme(): string {
        return this.layoutService.config.layoutTheme;
    }

    get logo(): string {
        const path = 'assets/layout/images/logo-';
        const logo = this.layoutTheme === 'primaryColor' ? 'light.png' : this.colorScheme === 'light' ? 'dark.png' : 'light.png';
        return path + logo;
    }

    get containerClass() {
        return {
            'layout-slim': this.layoutService.config.menuMode === 'slim',
            'layout-static': this.layoutService.config.menuMode === 'static',
            'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
            'layout-static-inactive': this.layoutService.state.staticMenuDesktopInactive && this.layoutService.config.menuMode === 'static',
            'p-input-filled': this.layoutService.config.inputStyle === 'filled',
            'p-ripple-disabled': !this.layoutService.config.ripple,
            'layout-light': this.layoutService.config.layoutTheme === 'colorScheme' && this.layoutService.config.colorScheme === 'light',
            'layout-dark': this.layoutService.config.layoutTheme === 'colorScheme' && this.layoutService.config.colorScheme === 'dark',
            'layout-primary': this.layoutService.config.colorScheme !== 'dark' && this.layoutService.config.layoutTheme === 'primaryColor',
        };
    }
}
