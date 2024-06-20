// components/BroadcastTabs.tsx
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

interface BroadcastTabsProps {
  tabs: string[];
  onTabChange: (tab: string) => void;
  searchPlaceholder?: string;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

function BroadcastTabs({
  tabs,
  onTabChange,
  searchPlaceholder = "Search",
  activeTab,
  setActiveTab,
}: BroadcastTabsProps) {
  // const [activeTab, setActiveTab] = useState(tabs[0]);

  function handleTabClick(tab: string) {
    // setActiveTab(tab);
    onTabChange(tab);
  }

  return (
    <div className="flex justify-between items-center">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`text-sm font-medium ${
              activeTab === tab
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500"
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="relative">
        <CiSearch className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="border border-gray-300 text-sm rounded pl-10 pr-4 py-2 focus:outline-none"
        />
      </div>
    </div>
  );
}

export default BroadcastTabs;
