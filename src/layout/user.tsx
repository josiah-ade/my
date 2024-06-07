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
      <AppBar onToggle={toggleDrawer} />
      <div className="flex h-screen pt-[5.5rem]">
        <AppDrawer display={showDrawer} onToggle={toggleDrawer} />
        <div className="flex-col bg-background flex gap-y-1 w-full overflow-auto p-5 h-full">{props.children}</div>
      </div>
    </>
  );
}
