import PageHeading from "@/components/common/text/pageHeading";
import CreateLogger from "@/components/logger/createlogger";
import DisplayLogger from "@/components/logger/displaylogger";
import UserLayout from "@/layout/user";
import { ITemplate } from "@/typings/interface/templates";
import React, { useState } from "react";

export default function UserLogger() {
  const [activeTempate, setActiveTempate] = useState<ITemplate>()
  return (
    <div>
      <PageHeading title={"Test Logger"} description={"Testing the logger"} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[2rem] mt-5">
        <CreateLogger />
        <DisplayLogger setSingleUserData={setActiveTempate}/>
      </div>
    </div>
  );
}

UserLogger.Layout = UserLayout;
