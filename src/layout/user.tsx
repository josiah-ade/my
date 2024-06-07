import AppBar from "@/components/layout/appBar";
import AppDrawer from "@/components/layout/appDrawer";
import { PropsWithChildren, useState } from "react";

export default function UserLayout(props: PropsWithChildren) {
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = () => {
    setShowDrawer((val) => !val);
  };
  return (
    <>
      <div className="flex h-screen w-full">
        <div className="">
          <AppDrawer display={showDrawer} onToggle={toggleDrawer} />
        </div>
        <div className=" bg-background flex gap-9 flex-col gap-y-1 w-full p-5 ">
            <AppBar onToggle={toggleDrawer} />
          <div className="flex-col bg-background flex gap-y-1 w-full overflow-auto p-5">
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
}
