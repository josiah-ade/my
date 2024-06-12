import { content } from "@/core/const/tab/content";
import { useState } from "react";
import TabDetails from "../contactdetails";
import { useRouter } from "next/router";
import Link from "next/link";

export default function TabComponent(){
  const router = useRouter()
    const [activeTab, setActiveTab] = useState(0);
    const handleRedirect=()=>{
      router.push("/user/contactlist")
    }
  
  const tabs = ["Phone Contacts", "WhatsApp Group Contacts", "Google Contacts"];
//   const content = [
//     "Content for Tab 1",
//     "Content for Tab 2",
//     "Content for Tab 3",
//   ];
    return(
        <div className="w-full  mt-10">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`px-4 py-2 focus:outline-none ${
                activeTab === index
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-4">
        {content.map((cont, index) => (
          <Link href={cont.path} key={cont.path} >
          <div
            className={`${activeTab === index ? "block" : "hidden"}`}
          >
            <TabDetails
              icon={cont.icon}
              phone={cont.phone}
              description={cont.description}
              total={cont.total}
              totaldescription={cont.totaldescription}
              // onClick={handleRedirect} 
              path={cont.path}          
                />
          </div>
          </Link>
        ))}
        </div>
      </div>
    )
}