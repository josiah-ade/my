import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import UserLayout from "@/layout/user";
import { Tabdetails } from "@/typings/interface/component/tab/tabdetails";
import HasBack from "@/components/common/hasback/hasback";
import TabLists from "@/components/contacts/tab/tabdetail";
import { useGetGroupAcount, useGetSingleUsersAcount } from "@/providers/hooks/query/getaccount";
import { useParams } from "next/navigation";
import { IGroupAccount } from "@/typings/interface/account";

export default function WhatsappList(){
  const router = useRouter()
  const {id}=useParams()
  const{data:groupAccount}=useGetGroupAcount(id as string)
  const {data:accountDetails}=useGetSingleUsersAcount(id as string)

   
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
        <div className=" grid grid-cols-[repeat(auto-fill,minmax(22rem,1fr))] gap-4 mt-5">
        {groupAccount && groupAccount?.map((item: IGroupAccount) => (
        <Link href={`/user/contacts/whatsaplist/${item.id}`} key={item.id} className="border p-5 rounded-[0.6rem] w-full">
          <TabLists
            // icon={item.icon}
            phoneNumber={item.name}
            description={`${item.participants.length} contacts`}
             id={item.id}         
                // total={item.total}
            // totaldescription={item.totaldescription}
            // path={item.path}
          />
        </Link>
      ))}
        </div>
      </div>
        </UserLayout>
    )
}