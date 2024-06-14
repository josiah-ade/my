// components/Tabs.tsx

import React, { useState, ReactNode } from 'react';

type TabProps = {
  label?: string;
  icon?: ReactNode;
  content?: ReactNode;
};

export default function Tabs({ tabs }: { tabs: TabProps[] }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className='w-full '>
      <div className="flex  w-full items-center justify-center">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`flex items-center py-2 px-4 -mb-px text-sm font-medium text-center border-b-2 transition-all duration-300 ${
              activeTab === index
                ? 'text-orange-500 border-orange-500'
                : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-white'
            }`}
          >
            {tab.icon}
            <span className="ml-2">{tab.label}</span>
          </button>
        ))}
      </div>
      <div className="relative">
          <div className={`transition-opacity duration-300 ease-in-out  left-0 w-full `}>
            {tabs[activeTab].content}
          </div>
        
      </div>
    </div>
  );
}

