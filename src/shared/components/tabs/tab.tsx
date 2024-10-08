

import React, { useState, ReactNode,  useEffect } from "react";

type TabProps = {
  label?: ReactNode;
  icon?: ReactNode;
  content?: ReactNode;
  disabled?: boolean;

};

interface TabComponentProps {
  tabs: TabProps[];
  searchPlaceholder?: string;
  defaultTab?: number;
  onTabChange?: (index: number) => void;
}

export default function Tabs({ tabs, searchPlaceholder, onTabChange, defaultTab = 0,}: TabComponentProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    onTabChange && onTabChange(activeTab);
  }, [activeTab]);


  return (
    <div className="w-full ">
      <div className={`flex  w-full items-center `}>
        {tabs?.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            // className={`flex items-center py-2 px-4 -mb-px text-sm font-medium text-center border-b-2 transition-all duration-300 ${
            //   activeTab === index
            //     ? "text-primary border-primary"
            //     : "text-gray-500 border-transparent hover:text-gray-700 hover:border-white"
            // }`}
            className={`flex items-center py-2 px-4 -mb-px text-sm 
              font-medium text-center border-b-2 transition-all duration-300 
              ${activeTab === index
                ? "text-primary border-primary"
                : `text-gray-500 border-transparent ${tab.disabled ? 'cursor-not-allowed opacity-50' : 'hover:text-gray-700 hover:border-white'}`
            }`}
            disabled={tab.disabled}>
            {tab.icon}
            <span className="ml-2 text-[0.85rem] text-gray-700">{tab.label}</span>
          </button>
        ))}
      </div>
      {searchPlaceholder ? (
        <div>
          <input type="text" placeholder={""} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
        </div>
      ) : null}
      <div className="relative">
        <div className={`transition-opacity duration-300 ease-in-out  left-0 w-full `}>{tabs[activeTab].content}</div>
      </div>
    </div>
  );
}
