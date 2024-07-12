import { TableHeaderActionProp } from "@/typings/interface/component/table";
import { IMessageResponse } from "@/typings/interface/message";
import { useState } from "react";


function ListPopover({ item }: TableHeaderActionProp<IMessageResponse>) {
  const [showPopover, setShowPopover] = useState(false);

  const lists = item?.broadcastDetail ?? []

  return (
    <div className="relative">
      <button
        type="button"
        className="text-blue-600 hover:underline"
        onMouseEnter={() => setShowPopover(true)}
        onMouseLeave={() => setShowPopover(false)}
      >
        {lists?.length ?? 0} Lists
      </button>
      {showPopover && (
        <div className="absolute mt-2 w-fit rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {lists?.map((list, index) => (
              <p key={index} className="block px-4 py-2 text-sm text-gray-700">
                {list.listName}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ListPopover;
