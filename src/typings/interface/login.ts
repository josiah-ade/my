export interface ILogin{
    email:string,
    password:string,
    name:string,
    useremail:string
}


export interface AuthResponse {
    id: string;
    email: string;
    fullName: string;
    accessToken: string;
    refreshToken: string;
}