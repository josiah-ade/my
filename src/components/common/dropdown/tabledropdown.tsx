import { TableHeaderActionProp } from "@/typings/interface/component/table";
import { IMessageResponse } from "@/typings/interface/message";
import { useEffect, useRef, useState } from "react";
import { LuDot } from "react-icons/lu";


function TableActionDropDown({ item }: TableHeaderActionProp<IMessageResponse>) {
  const [showPopover, setShowPopover] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const lists = item?.broadcastDetail ?? []

   const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef?.current?.contains(event.target as Node)) {
      setShowPopover(false);
    }
  };
  useEffect(() => {
    if (showPopover) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopover]);

  return (
    <div className="relative">
      <button
        type="button"
        className="text-blue-600 hover:underline"
        onClick={() => setShowPopover(true)}
      >
        {lists?.length ?? 0} Lists
      </button>
      {showPopover && (
        <div
        ref={dropdownRef}
         className="absolute mt-2 w-fit rounded-md shadow-xl bg-white ring-1 ring-black ring-opacity-5 px-4 py-3  z-[1000]">
          <p className="text-gray-800 font-bold">Lists in this broadcast</p>
          <ul
            className="py-1 list-disc"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {lists.map((list, index) => (
              <li key={index} className="text-sm text-gray-500 flex flex-row gap-1">
                <div className="mt-1">
                <LuDot />
                </div>
               <p className="block">{list.listName}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TableActionDropDown;
