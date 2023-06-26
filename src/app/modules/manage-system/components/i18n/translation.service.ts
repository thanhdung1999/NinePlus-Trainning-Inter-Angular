// Localization is based on '@ngx-translate/core';
// Please be familiar with official documentations first => https://github.com/ngx-translate/core

import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
// import { Subscription } from 'rxjs';

export interface Locale {
    lang: string;
    data: any;
}

const LOCALIZATION_LOCAL_STORAGE_KEY = 'language';

@Injectable({
    providedIn: 'root',
})
export class TranslationService {
    // Private properties
    private langIds: any = [];
    // subscription: Subscription;

    constructor(private translate: TranslateService, public primeNGConfig: PrimeNGConfig) {
        const setLangs = async () => {
            // add new langIds to the list
            await this.translate.addLangs(['en']);
            // this language will be used as a fallback when a translation isn't found in the current language
            await this.translate.setDefaultLang('en');
        };
        setLangs();
    }

    loadTranslations(...args: Locale[]): void {
        const locales = [...args];

        locales.forEach((locale) => {
            // use setTranslation() with the third argument set to true
            // to append translations instead of replacing them
            this.translate.setTranslation(locale.lang, locale.data, true);
            this.langIds.push(locale.lang);
            // this.primeNGConfig.setTranslation(data);
            // console.log(locale.data.primeng)
            // this.primeNGConfig.setTranslation(locale.data.primeng);
        });
        switch (this.getSelectedLanguage()) {
            case 'vn':
                this.primeNGConfig.setTranslation(this.translate.store.translations.vn.primeng);
                break;
            default:
                this.primeNGConfig.setTranslation(this.translate.store.translations.en.primeng);
                break;
        }
        // add new languages to the list
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

    /**
     * Returns selected language
     */
    getSelectedLanguage(): any {
        return (
            localStorage.getItem(LOCALIZATION_LOCAL_STORAGE_KEY) || this.translate.getDefaultLang()
        );
    }
}
