import { DayOptions } from "@/core/const/automation/days.const";
import { TimeZones } from "@/core/const/automation/timezone";
import { IListAutomation } from "@/typings/interface/automation";
import { TableHeaderActionProp } from "@/typings/interface/component/table";
import moment from "moment";

export default function RunDayDisplay(props: TableHeaderActionProp<IListAutomation>) {
    const timeZoneOption = TimeZones.find(item => item.value == props.item?.timeZone);
    const itemType = DayOptions.find(item => item.value == props.item?.type);

    const currentItem = props.item

    function daySelectOption() {
        if (!currentItem) return ''
        if ((itemType?.typeValue ?? 0) >= 1 || props.item?.type === "default") {
            return moment(`1970-01-01T${currentItem.time}`).tz(currentItem.timeZone).format('HH:mm [GMT]Z') ?? '';
        }
        let displayText = '';
        if (props.item?.type == "sameday") {
            displayText = `${props.item.minutesAfter.toString()} mins after`;
        } else if (props.item?.type === "immediately") {
            displayText = 'immediately';
        }
        return displayText;
    }

    let displayText = daySelectOption();
    return (
        <div>{displayText}</div>
    );
}
