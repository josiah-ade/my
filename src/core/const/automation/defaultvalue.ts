import { ICreateAutomationList } from "@/typings/interface/automation";

const defaultValue: ICreateAutomationList = {
    accountId: "",
    broadCastListId: "",
    type: "",
    typeValue: 0,
    time: "",
    timeZone: "",
    status: "active",
    tagCondition: "",
    tags: [],
    files: [],
    text: "",
    sendDate: "",
    minutesAfter: 0
  };
  export default defaultValue