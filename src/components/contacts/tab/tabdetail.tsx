import Image from "next/image";
import profile from "../../../assets/profile.png";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IContact } from "@/typings/interface/account";
import { IconType } from "react-icons";

interface IProps extends IContact {
  displayTotal?: boolean;
  totalKey?: string;
  total?: number;
  icon?: IconType;
}

export default function TabLists(props: IProps) {
  const displayTotal = props.displayTotal ?? true;
  const totalKey = props.totalKey || "Contacts";
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
      {displayTotal ? (
        <>
          <div className="py-4 mt-7">
            <hr />
          </div>
          <div className="flex flex-row justify-between capitalize flex-wrap">
            <p className="text-gray-500 text-xs">Total {totalKey}</p>
            <p className="text-success font-bold">
              {props.total} {totalKey}
            </p>
          </div>
        </>
      ) : null}
    </>
  );
}
