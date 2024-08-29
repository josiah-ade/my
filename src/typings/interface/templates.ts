export interface ICreateTemplate {
    name: string,
    text: string,
    files: Record<string, any>[];
}
export interface ITemplate {
    name: string,
    text: string,
    id:string
}