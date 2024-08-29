import { AutomationTemplateMatchType } from "@/core/enum/automation";
import { ICreateTemplateMessage, TemplateMessage } from "@/typings/interface/automation/template";

export const DefaultCreateGroupAutomationTemplateMessage: ICreateTemplateMessage = {
    Text: "",
    nextMessage: 0
};

export const DefaultCreateGroupAutomationTemplateData: TemplateMessage = {
    accountId: "",
    templateName: "",
    type: AutomationTemplateMatchType.TIME,
    message: [{...DefaultCreateGroupAutomationTemplateMessage}],
    wordTrigger: ""
}