import { ListSelectorProps } from "@/core/types/data.interface";
import { IBroadcastLists } from "@/typings/interface/broadcasts";
import React from "react";

interface IProps {
  lists: (IBroadcastLists & { selected?: boolean })[];
  onToggle: (index: number) => void;
  onSelectAll: () => void;
}

function ListSelector({ lists, onToggle, onSelectAll }: IProps) {
  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold text-black">List ({lists.length} Lists)</h2>
        <button onClick={onSelectAll} className="text-orange-500 hover:underline">
          Select All Lists
        </button>
      </div>
      <div className="p-2">
        {lists.map((list, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
            <div>
              <p className="text-xs font-medium">{list.listName}</p>
              <p className="text-xs text-gray-500">{list.contacts} Contacts</p>
            </div>
            <button
              disabled={list.contacts < 1}
              className={`relative inline-flex items-center h-6 rounded-full w-11 ${
                list.selected ? "bg-orange-500" : "bg-gray-200"
              }`}
              onClick={() => onToggle(index)}
            >
              <span
                className={`${
                  list.selected ? "translate-x-6" : "translate-x-1"
                } inline-block w-4 h-4 transform bg-white rounded-full`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListSelector;
