// Localization is based on '@ngx-translate/core';
// Please be familiar with official documentations first => https://github.com/ngx-translate/core

import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

export interface Locale {
    lang: string;
    data: any;
}

const LOCALIZATION_LOCAL_STORAGE_KEY = 'language';

@Injectable({
    providedIn: 'root',
})
export class TranslationService {
    private langIds: any = [];

    constructor(private translate: TranslateService, public primeNGConfig: PrimeNGConfig) {
        const setLangs = async () => {
            await this.translate.addLangs(['vn']);
            await this.translate.setDefaultLang('vn');
        };
        setLangs();
    }

    loadTranslations(...args: Locale[]): void {
        const locales = [...args];

        locales.forEach((locale) => {
            this.translate.setTranslation(locale.lang, locale.data, true);
            this.langIds.push(locale.lang);
        });
        switch (this.getSelectedLanguage()) {
            case 'vn':
                this.primeNGConfig.setTranslation(this.translate.store.translations.vn.primeng);
                break;
            default:
                this.primeNGConfig.setTranslation(this.translate.store.translations.en.primeng);
                break;
        }
        this.translate.addLangs(this.langIds);
        this.translate.use(this.getSelectedLanguage());
    }

    setLanguage(lang: string) {
        if (lang) {
            this.translate.use(this.translate.getDefaultLang());
            this.translate.use(lang);
            localStorage.setItem(LOCALIZATION_LOCAL_STORAGE_KEY, lang);
        }
    }
    getSelectedLanguage(): any {
        return localStorage.getItem(LOCALIZATION_LOCAL_STORAGE_KEY) || this.translate.getDefaultLang();
    }
}
