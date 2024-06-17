// import { content } from "@/core/const/tab/content";
import { useState } from "react";
import TabDetails from "../../../components/contacts/phonelist";
import { useRouter } from "next/router";
import Link from "next/link";
import { Whatsappcontent } from "@/core/const/tab/whatsapplist";
import UserLayout from "@/layout/user";
import { Tabdetails } from "@/typings/interface/component/tab/tabdetails";
import HasBack from "@/components/common/hasback/hasback";
import TabLists from "@/components/contacts/tab/tabdetail";

export default function WhatsappList(){
  const router = useRouter()
   
    return(
        <UserLayout>
           <div className="flex flex-row gap-3">
        <HasBack hasBack={true} title={"GoBack"} />
        </div>
        <div className="w-full mb-20">
        <div className="mt-5">
          <h1 className="font-bold text-2xl">+234 915 776 9224</h1>
          <p className="mt-2">View all your groups for this account</p>
        </div>
        <div className=" grid grid-rows-3 gap-5 mt-5">
        {Whatsappcontent.map((cont:Tabdetails, index) => (
          <Link href={cont.path || ""} key={cont.path} >
            <TabLists
              icon={cont.icon}
              phone={cont.phone}
              description={cont.description}
              total={cont.total}
              totaldescription={cont.totaldescription}
              path={cont.path}          
                />
          </Link>
        ))}
        </div>
      </div>
        </UserLayout>
    )
}