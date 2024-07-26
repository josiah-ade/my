import { IDayOption } from "@/typings/interface/automation";

const dayArray: IDayOption[] = Array(500).fill(0).map((item, index) => ({ value: `day_${index + 1}`, typeValue: index + 1, text: `Day ${index + 1}` }))
const typeArray: IDayOption[] = [
    {
        value: "immediately",
        text: "Immediately joined",
        typeValue: -1,
    },
    {
        value: "sameday",
        text: "Same day joined",
        typeValue: 0,
    },
    {
        value: "default",
        text: "All",
        typeValue: 0,
    }
]
export const DayOptions = [...typeArray, ...dayArray];