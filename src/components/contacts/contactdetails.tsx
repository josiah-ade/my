import { IconType } from "react-icons";
import Image from "next/image";
import profile from "../../assets/profile.png";
import { Tabdetails } from "@/typings/interface/component/tab/tabdetails";

export default function TabDetails(props: Tabdetails) {
  const { icon, phone, description, onClick } = props;
  const handleRedirect = () => {
    onClick && onClick();
  };
  return (
    <div className="border py-5 px-4 rounded  w-full max-w-[320px]">
      <div className="py-3">
        <Image src={profile} alt="contact" height={30} width={30} />
      </div>
      <div className="flex flex-row justify-between ">
        <div>
          <div className="font-bold ">{props.phone}</div>
          <div className="text-primary-6">{props.description}</div>
        </div>
        <div className="mt-2">{props.icon ? <props.icon size={23} className=" text-primary" /> : null}</div>
      </div>
      <div className="py-4 mt-7">
        <hr />
      </div>
      <div className="flex flex-row justify-between flex-wrap">
        <p className="text-primary-6">{props.total}</p>
        <button className="text-success font-bold">{props.totaldescription} </button>
      </div>
    </div>
  );
}
