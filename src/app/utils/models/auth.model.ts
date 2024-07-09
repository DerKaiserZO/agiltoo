export interface LoginUser {
    email: string;
    password: string;
}

export interface SignupUser extends LoginUser {
    name: string;
}