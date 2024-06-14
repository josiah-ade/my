import { MdOutlineFormatAlignJustify } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { RiContactsLine } from "react-icons/ri";





export default function ContactList(){
    return(
        <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-6">
            <div className="mt-2"><RiContactsLine size={20} className="bg-primary-2 rounded "/></div>
                <div>
                <h3 className="font-bold">Create Contact Lists</h3>
                <p className="text-primary-6">Find a doctor and specialization</p>
                </div>
            </div>
            <div>
            <MdOutlineKeyboardArrowRight size={24} className=" text-primary-6" />
            </div>
        </div>
    )
}