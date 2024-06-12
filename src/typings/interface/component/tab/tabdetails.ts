import { IconType } from "react-icons";

export interface Tabdetails{
    icon:IconType,
    phone:string,
    description:string,
    total:string,
    totaldescription:string,
    onClick?:()=>void,
    path?:string;
}