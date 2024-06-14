// import { content } from "@/core/const/tab/phone";
import { useState } from "react";
import TabDetails from "../phonelist";
import { useRouter } from "next/router";
import Link from "next/link";
import EmailList from "../email";
import WhatsAppList from "../whatsapp";
import Phonelists from "../phonelist";

export default function TabComponent() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ["Phone Contacts", "WhatsApp Group Contacts", "Google Contacts"];

  return (
    <div className="w-full  mt-10">
      <div className="flex border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 focus:outline-none ${
              activeTab === index ? "border-b-2 border-primary text-primary" : "text-gray-600"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="p-4">
        <div className="p-4">
          {activeTab === 0 && <Phonelists />}
          {activeTab === 1 && <WhatsAppList />}
          {activeTab === 2 && <EmailList />}
        </div>
      </div>
    </div>
  );
}
