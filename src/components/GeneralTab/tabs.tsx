import { useState, ReactNode } from "react";

interface TabProps {
  label: string;
  content: ReactNode;
  searchPlaceholder: string;
  filterFunction: (searchTerm: string) => ReactNode;
}

interface TabsProps {
  tabs: TabProps[];
}

const Tabs = ({ tabs }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <div className="flex border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`p-4 ${activeTab === index ? "border-b-2 border-orange-500 text-orange-500" : ""}`}
            onClick={() => {
              setActiveTab(index);
              setSearchTerm("");
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex justify-end mt-4">
        <div className="flex items-center bg-gray-100 p-2 rounded w-full sm:w-1/2 lg:w-1/3">
          <input
            type="text"
            placeholder={tabs[activeTab].searchPlaceholder}
            className="bg-gray-100 outline-none w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-4">{tabs[activeTab].filterFunction(searchTerm)}</div>
    </div>
  );
};

export default Tabs;
