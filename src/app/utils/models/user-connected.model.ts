export interface UserConnected {
    accessToken: string;
    expiresIn: string;
    roles: string[];
    tokenType: string;
}

export interface UserInfos {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
    roles: string[];
}