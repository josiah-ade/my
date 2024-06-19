import Image from "next/image";
import profile from "../../../assets/profile.png";
import { Tabdetails } from "@/typings/interface/component/tab/tabdetails";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IContact } from "@/typings/interface/account";

export default function TabLists(props: IContact) {
  // icon={item.icon}
  // total={item.total}
  // totaldescription={item.totaldescription}
  // path={item.path}
  return (
    <>
      <Image src={profile} alt="contact" className="w-10 h-10" />
      <div className="flex flex-row gap-2 mt-4 justify-between items-end">
        <div>
          <div className="font-bold text-xl">{props.phoneNumber}</div>
          <div className="text-gray-500 mt-1.5 text-xs ">{props.description}</div>
        </div>
         <MdOutlineKeyboardArrowRight size="1.25rem" className="text-primary text-xl" />
      </div>
      <div className="py-4 mt-7">
        <hr />
      </div>
      <div className="flex flex-row justify-between flex-wrap">
        <p className="text-gray-500 text-xs">Total Contacts</p>
        <button className="text-success font-bold">3 Contacts</button>
        {/* <p className="text-gray-500 text-xs">{props.total}</p> */}
        {/* <button className="text-success font-bold">{props.totaldescription}</button> */}
      </div>
    </>
  );
}
