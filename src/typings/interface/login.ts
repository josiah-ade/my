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
  interface Business {
    name: string;
    line: string;
    id: string;
  }

export interface AuthResponse {
    token:string;
    id: string;
    email: string;
    fullname: string;
    accessToken: string;
    refreshToken: string;
    business: Business;

}
