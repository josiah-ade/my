import { DayOptions } from "@/core/const/automation/days.const";
import { IDayOption, IListAutomation } from "@/typings/interface/automation";
import { TableHeaderActionProp } from "@/typings/interface/component/table";
import moment from "moment";


export default function RunDayDisplay(props: TableHeaderActionProp<IListAutomation> & { field: string }) {
    const daydisplay = DayOptions.find(item => item.value == props.item?.type)
    function daySelectOption(field: string, daydisplay?: IDayOption) {
        if (field != 'daytorun') return daydisplay?.text ?? ''
        let displayText = ''
        if (daydisplay?.value == "default") {
            displayText = moment(props.item?.sendDate).format('DD MMM YYYY')
        } else if ((daydisplay?.typeValue ?? 0) >= 1) {
            displayText = daydisplay?.text ?? ''
        } else {
            displayText = "--"
        }

        return displayText
    }


    let displayText = daySelectOption(props.field, daydisplay)
    return (
        <div>{displayText}</div>
    )
}