export interface Branch {
    id?: string;
    code: string;
    title: string;
    countryId: number;
    provinceId: number;
    districtId: number;
    wardId: number;
    isActive: boolean;
    branchLocation: BranchLocation;
}

export interface BranchLocation {
    wardTitle: string;
    districtTitle: string;
    provinceTitle: string;
    countryTitle: string;
}
