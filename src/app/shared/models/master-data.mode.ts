export interface MasterDataModel {
    id: any;
    nameEn?: string;
    nameVi?: any;
    nameJa?: any;

    description: string;
}
export interface MasterDataRoleModel {
    id?: string;
    name?: string;
}
export interface MasterDataDepartment {
    idRoom: any;
    id?: string;
    nameEn?: string;
    nameVi?: string;
    nameJa?: string;
    parentId: number;
    level: number;
    line: number;
}

export interface MsgModel {
    id: string;
    message_VN: string;
    message_EN: string;
    message_JP: string;
}
