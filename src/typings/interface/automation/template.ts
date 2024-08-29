import { AutomationTemplateMatchType } from "@/core/enum/automation";

export interface TemplateSendMessage{
    templateName:string;
    type:string;
    wordTrigger:number;
    text:string;
    minutesAfter:number
}
export interface ICreateTemplateMessage{
    Text:string;
    nextMessage:number;
    files?: File[];
}

export interface TemplateMessage{
    accountId:string;
    templateName:string;
    type:AutomationTemplateMatchType;
    startDate?: string;
    time?: string;
    timeZone?: string;
    message:ICreateTemplateMessage[];
    files?: File[];
    wordTrigger:string;
}

