import AppBar from "@/components/layout/appBar";
import AppDrawer from "@/components/layout/appDrawer";
import { useAuthContext } from "@/providers/context/auth";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect, useState } from "react";

export default function UserLayout(props: PropsWithChildren) {
  const [showDrawer, setShowDrawer] = useState(false);
  const { islLoggedIn, loaded } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loaded) return;
    if (!islLoggedIn) {
      router.push("/");
    }
  }, [islLoggedIn, loaded]);

  const toggleDrawer = () => {
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
            <div className="flex-col mt-[5.3rem] lg:pl-[19rem]  bg-background flex gap-y-1 w-full  p-7">
              {props.children}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
