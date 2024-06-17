import AppBar from "@/components/layout/appBar";
import AppDrawer from "@/components/layout/appDrawer";
import { useAuthContext } from "@/providers/context/auth";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect, useState } from "react";

export default function UserLayout(props: PropsWithChildren) {
  const [showDrawer, setShowDrawer] = useState(false);
  const { islLoggedIn, } = useAuthContext();
  const router = useRouter();
  // const [open, setOpen] = useState(false);

  useEffect(() =>   {
    if (!islLoggedIn) {
      router.push("/");
    } else{
      router.push("/user");
    }
  }, [islLoggedIn, router]);

  const toggleDrawer = () =>{
    setShowDrawer((val) => !val);
  };
  return (
    <>
    {islLoggedIn ? (
      <div className="h-screen w-full">
        <div className="">
          <AppBar onToggle={toggleDrawer} />
        </div>
        <div className=" bg-background text-gray-900 flex flex-row gap-y-1 w-full   ">
          <AppDrawer display={showDrawer} onToggle={toggleDrawer} />
          <div className="flex-col bg-background flex gap-y-1 w-full overflow-auto p-7">{props.children}</div>
        </div>
      </div>):(<></>)}
    </>
  );
}
