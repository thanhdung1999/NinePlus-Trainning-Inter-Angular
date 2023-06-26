export interface LanguageFlag {
    lang: string;
    name: string;
    flag: string;
    active?: boolean;
}

export const LANGUAGES = [
    {
        lang: 'en',
        name: 'English',
        flag: './assets/layout/flags/united-states.svg',
    },
    {
        lang: 'vn',
        name: 'Vietnamese',
        flag: './assets/layout/flags/vietnam.svg',
    },
];
