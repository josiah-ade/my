export interface ISignUp{
    email:string,
    password:string,
    fullname:string,
    businessline:string
}
export interface ILogin{
    email:string,
    password:string,
}


export interface AuthResponse {
    id: string;
    email: string;
    fullName: string;
    accessToken: string;
    refreshToken: string;
}