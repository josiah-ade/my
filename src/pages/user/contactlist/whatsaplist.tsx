import { content } from "@/core/const/tab/content";
import { useState } from "react";
import TabDetails from "../../../components/contacts/contactdetails";
import { useRouter } from "next/router";
import Link from "next/link";
import { Whatsappcontent } from "@/core/const/tab/whatsapplist";
import UserLayout from "@/layout/user";
import { Tabdetails } from "@/typings/interface/component/tab/tabdetails";

export default function WhatsappList(){
  const router = useRouter()
    const [activeTab, setActiveTab] = useState(0);
    const handleRedirect=()=>{
      router.push("/user/contactlist")
    }
    return(
        <UserLayout>
        <div className="w-full  mt-10">
        <div className=" grid grid-cols-4 gap-5">
        {Whatsappcontent.map((cont:Tabdetails, index) => (
          <Link href={cont.path || ""} key={cont.path} >
            <TabDetails
              icon={cont.icon}
              phone={cont.phone}
              description={cont.description}
              total={cont.total}
              totaldescription={cont.totaldescription}
              // onClick={handleRedirect} 
              path={cont.path}          
                />
              
          </Link>
        ))}
        </div>
      </div>
        </UserLayout>
    )
}