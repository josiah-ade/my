import { MdOutlineFormatAlignJustify } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";




export default function CreateForm(){
    return(
        <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-6">
            <div className="mt-2"><FaWpforms size={20}   className="bg-primary-2 rounded "/></div>
                <div>
                <h3 className="font-bold">Create Form</h3>
                <p className="text-primary-6">Build your own survey</p>
                </div>
            </div>
            <div>
            <MdOutlineKeyboardArrowRight size={24} className=" text-primary-6" />
            </div>
        </div>
    )
}