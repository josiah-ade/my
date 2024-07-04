export interface ISignUp{
    email:string,
    password:string,
    fullname:string,
    line:string,
    name:string,
}
export interface ILogin{
    email:string,
    password:string,
}


export interface AuthResponse {
    [x: string]: string | null;
    id: string;
    email: string;
    fullname: string;
    accessToken: string;
    refreshToken: string;
}