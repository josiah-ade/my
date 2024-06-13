import { Tabdetails } from "@/typings/interface/component/tab/tabdetails";
import { FaPhone, FaWhatsapp, FaGoogle } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";


 export const content: Tabdetails[] = [
    {
      icon: MdOutlineKeyboardArrowRight,
      phone: "+234-123-456-7890",
      description: "Personal phone contacts",
      total:"Total Contacts",
      totaldescription:"9,200 Contacts",
      path:"/user/contactlist/contactlist"
    },
    {
      icon: MdOutlineKeyboardArrowRight,
      phone: "+234-098-765-4321",
      description: "Group chat contacts",
        total:"Total Groups",
      totaldescription:"9 Groups",
       path:"/user/contactlist/whatsaplist"
    },
    {
      icon: MdOutlineKeyboardArrowRight,
      phone: "+234-555-555-5555",
      description: "Synced Google contacts",
        total:"Total Contacts",
      totaldescription:"9,200 Contacts",
       path:"/user/contactlist/"
    },
  ];