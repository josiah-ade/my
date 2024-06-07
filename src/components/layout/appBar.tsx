import useActiveMenu from "@/providers/hooks/layout/activeMenu";
import Link from "next/link";

interface Props {
  onToggle: () => void;
}

export default function AppBar(props: Props) {
  const currentMenuItem = useActiveMenu();

  return (
    <>
      <div className="flex w-full max-w-[1100px] h-[70px] justify-between  items-center ">
        <div className="flex h-full items-center gap-3 ">
          <div className="py-2 lg:hidden" onClick={props.onToggle}>
            <svg className="h-6 w-6 text-blue-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <div className="hidden  md:flex lg:flex">
          <img src="./assets/icons/LOGO.svg" alt="" className="h-[40px] cursor-pointer" />
          <h2 className="text-xlg lg:text-2xl font-semibold"> {currentMenuItem?.title || "Dashboard"} </h2>
          </div>
        </div>
        <div className=" hidden md:flex ">
          <Link href="/login">
          <span className="font-semibold">Login</span>
          </Link>
        </div>
      </div>
    </>
  );
}
