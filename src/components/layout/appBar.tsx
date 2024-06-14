import useActiveMenu from "@/providers/hooks/layout/activeMenu";
import Link from "next/link";
import logo from "../../assets/logo.png";
import profile from "../../assets/profile.png";
import Image from "next/image";

interface Props {
  onToggle: () => void;
}

export default function AppBar(props: Props) {
  const currentMenuItem = useActiveMenu();

  return (
    <>
      <div className="flex w-full justify-between  items-center px-10 py-5 border-b ">
        <div className="flex h-full items-center gap-3 ">
          <div className="py-2 lg:hidden md:hidden" onClick={props.onToggle}>
            <svg className="h-6 w-6 text-blue-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <div className="hidden  md:flex lg:flex cursor-pointer gap-8 ">
            <Image src={logo} alt="Logo" height={200} width={100} />
            <div className="mt-2">
              <button className="bg-primary-5 text-white rounded-2xl px-3 py-1 text-center text-sm">Free plan</button>
              <span className="text-primary-5 text-sm pl-2">Upgrade</span>
            </div>
            {/* <h2 className="text-xlg lg:text-2xl font-semibold"> {currentMenuItem?.title || "Dashboard"} </h2> */}
          </div>
        </div>
        <div className=" hidden md:flex items-center gap-2">
          <Image src={profile} alt="profile" height={35} width={35} />
          <div>
            <h4>David Eskor</h4>
            <p>eek@gmail.com</p>
          </div>
        </div>
      </div>
    </>
  );
}
