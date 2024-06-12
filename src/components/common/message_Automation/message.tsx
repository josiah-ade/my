import { MdOutlineFormatAlignJustify } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineFlashAuto } from "react-icons/md";





export default function Automations(){
    return(
        <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-6">
            <div className="mt-2"><MdOutlineFlashAuto size={20}   className="bg-primary-2 rounded "/></div>
                <div>
                <h3 className="font-bold">Create Automations</h3>
                <p className="text-primary-6">Find a doctor and specialization</p>
                </div>
            </div>
            <div>
            <MdOutlineKeyboardArrowRight size={24} className=" text-primary-6" />
            </div>
        </div>
    )
}