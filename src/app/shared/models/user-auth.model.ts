export interface LoginRequest {
    email: string;
    password: string;
}

export interface UserAuthenticate {
    avatarUrl: string;
    email: string;
    employeeNo: string;
    refreshToken: string;
    refreshTokenExpiryTime: Date;
    role: string;
    token: string;
    userId: string;
}

export class RememberMe {
    constructor(public state: boolean, public username: string) {}
}
