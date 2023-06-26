export interface Departement {
    id?: string,
    code?:string,
    branchId?: string,
    location?: DepartementLocation,
    isActive: boolean;
}
export interface DepartementLocation {
    wardTitle: string;
    districtTitle: string;
    provinceTitle: string;
    countryTitle: string;
}
