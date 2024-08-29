import CreateBroadCastTemplates from "@/components/broadcast/template/createtemplate";
import BroadCastTemplatesComponent from "@/components/broadcast/template/templates";
import PageHeading from "@/components/common/text/pageHeading";
import UserLayout from "@/layout/user";
import { ITemplate } from "@/typings/interface/templates";
import { useState } from "react";

export default function BroadCastTemplates() {
    const [activeTempate, setActiveTempate] = useState<ITemplate>()

    return (
        <UserLayout>
            <PageHeading
                title={"Broadcast Templates"}
                description={"Create reusable broadcast templates from here"}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[2rem]">
                <CreateBroadCastTemplates activeTemplate={activeTempate} setActiveTemplate={setActiveTempate} />
                <BroadCastTemplatesComponent setSingleUserData={setActiveTempate}
                />
            </div>
        </UserLayout>
    )
}