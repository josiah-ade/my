export interface ISignUp{
    email:string,
    password:string,
    fullname:string,
    businessline:string,
    phoneNumber:string,
}
export interface ILogin{
    email:string,
    password:string,
}


export interface AuthResponse {
    [x: string]: string | null;
    id: string;
    email: string;
    fullName: string;
    accessToken: string;
    refreshToken: string;
}