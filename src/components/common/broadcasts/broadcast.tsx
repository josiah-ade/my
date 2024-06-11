import { MdOutlineFormatAlignJustify } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { PiBroadcastFill } from "react-icons/pi";





export default function BroadCastList(){
    return(
        <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-6">
            <div className="mt-2"><PiBroadcastFill size={20}   className="bg-primary-2 rounded "/></div>
                <div>
                <h3 className="font-bold">Create Broadcast Message</h3>
                <p className="text-primary-6">Find a doctor and specialization</p>
                </div>
            </div>
            <div>
            <MdOutlineKeyboardArrowRight size={24} className=" text-primary-6 "/>
            </div>
        </div>
    )
}