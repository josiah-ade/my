import { useBroadcastStore } from "@/providers/stores/broadcastStore";
import { IBroadcastLists } from "@/typings/interface/broadcasts";
import React, { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import EmptyState from "../common/empty/empty";

type ISelectableList = IBroadcastLists & { selected?: boolean };

interface IProps {
  setValue: Dispatch<SetStateAction<string[]>>;

  clearFlag?: boolean;
  updateClearFlag?: Dispatch<SetStateAction<boolean>>;
}

function ListSelector({ setValue, clearFlag, updateClearFlag }: IProps) {
  const isAllSelected = useRef(false);
  const lists = useBroadcastStore((state) => state.broadcasts);
  const [state, setState] = useState<ISelectableList[]>([...lists]);

  const handleToggle = (index: number) => {
    state[index].selected = !!!state[index].selected;
    setState([...state]);
  };

  useEffect(() => {
    if (lists.length) setState([...lists]);
  }, [lists]);

  useEffect(() => {
    const selected = state.reduce<string[]>((val, item) => {
      item.selected && val.push(item.id);
      return val;
    }, []);
    setValue([...selected]);
  }, [state]);

  useEffect(() => {
    if (clearFlag && updateClearFlag) {
      handleSelectAll(true);
      updateClearFlag(false);
    }
  }, [clearFlag]);

  const handleSelectAll = (clear = false) => {
    const val = isAllSelected.current;
    setState((list) => list.map((item) => ({ ...item, selected: item.contacts ? (clear ? false : !val) : false })));
    isAllSelected.current = !isAllSelected.current;
  };
  const emptyAccount = !lists ? "No account available. " :'';

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold text-black">List ({lists.length} Lists)</h2>
        <button onClick={() => handleSelectAll()} className="text-orange-500 hover:underline">
          Select All Lists
        </button>
      </div>
      {lists.length ? 
      <div className="p-2">
        {state.map((list, index) => (
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
              onClick={() => handleToggle(index)}
            >
              <span
                className={`${
                  list.selected ? "translate-x-6" : "translate-x-1"
                } inline-block w-4 h-4 transform bg-white rounded-full`}
              />
            </button>
          </div>
        ))}
      </div>: <EmptyState  title={emptyAccount}  padding="py-2" />}
    </div>
  );
}

export default ListSelector;
