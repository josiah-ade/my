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
      <div className="h-screen w-full">
        <div className="">
            <AppBar onToggle={toggleDrawer} />
        </div>
        <div className=" bg-background flex flex-row gap-y-1 w-full   ">
          <AppDrawer display={showDrawer} onToggle={toggleDrawer} />
          <div className="flex-col bg-background flex gap-y-1 w-full overflow-auto p-5">
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
}
