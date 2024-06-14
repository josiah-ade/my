import Image from "next/image";
import profile from "../../../assets/profile.png";
import { Tabdetails } from "@/typings/interface/component/tab/tabdetails";

export default function TabLists(props: Tabdetails) {
  return (
    <>
      <Image src={profile} alt="contact" className="w-10 h-10" />
      <div className="flex flex-row gap-2 mt-4 justify-between items-end">
        <div>
          <div className="font-bold text-xl">{props.phone}</div>
          <div className="text-gray-500 mt-1.5 text-xs ">{props.description}</div>
        </div>
        {props.icon ? <props.icon size="1.25rem" className="text-primary text-xl" /> : null}
      </div>
      <div className="py-4 mt-7">
        <hr />
      </div>
      <div className="flex flex-row justify-between flex-wrap">
        <p className="text-gray-500 text-xs">{props.total}</p>
        <button className="text-success font-bold">{props.totaldescription}</button>
      </div>
    </>
  );
}
