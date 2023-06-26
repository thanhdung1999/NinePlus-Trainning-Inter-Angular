import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { TranslationService } from 'src/app/modules/manage-system/components/i18n';
import { LanguageFlag, LANGUAGES } from 'src/app/shared';

@Component({
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
	language: LanguageFlag | undefined;
	langs = LANGUAGES;
	constructor(
		private layoutService: LayoutService , 
		private _translationService: TranslationService,) {}

	get filledInput(): boolean {
		return this.layoutService.config.inputStyle === 'filled';
	}
	ngOnInit(): void {
        this.setLanguage(this._translationService.getSelectedLanguage());
    }
    selectLanguage(lang: string) {
        this._translationService.setLanguage(lang);
        this.setLanguage(lang);
    }

    setLanguage(lang: string) {
        this.langs.forEach((language: LanguageFlag) => {
            if (language.lang === lang) {
                language.active = true;
                this.language = language;
            } else {
                language.active = false;
            }
        });
    }
}
