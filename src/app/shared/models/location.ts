export interface Country {
    id: number;
    name: string;
    code: string;
    isoCode: string;
    languageCode: string;
}

export interface Province {
    id: number;
    name: string;
    code: string;
    countryCode: number;
}

export interface District {
    id: number;
    name: string;
    prefix: string;
    provinceId: number;
}

export interface Ward {
    id: number;
    name: string;
    prefix: string;
    districtId: number;
}
