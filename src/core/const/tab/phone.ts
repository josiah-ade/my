import { Tabdetails } from "@/typings/interface/component/tab/tabdetails";
import { FaPhone, FaWhatsapp, FaGoogle } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";


 export const phoneList: Tabdetails[] = [
    {
      icon: MdOutlineKeyboardArrowRight,
      phone: "+234-123-456-7890",
      description: "Personal phone contacts",
      total:"Total Contacts",
      totaldescription:"9,200 Contacts",
      path:"/user/contactlist/contactlist",
      id:"1",
    },
  
  ];