import { useGetGroupAccount } from "@/providers/hooks/query/getaccount";
import { ContactAccount, IGroupAccount } from "@/typings/interface/account";
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import EmptyState from "../common/empty/empty";
import { LoadingIndicator } from "../common/loading/modalloading";

type ISelectableGroups = IGroupAccount & { selected?: boolean };

interface IProps {
  accountId: string;
  setValue: Dispatch<SetStateAction<string[]>>;
  clearFlag?: boolean;
  updateClearFlag?: Dispatch<SetStateAction<boolean>>;
}

export default function GroupSelector({ setValue, accountId, clearFlag, updateClearFlag }: IProps) {
  const [state, setState] = useState<ISelectableGroups[]>([]);
  const isAllSelected = useRef(false);

  const { data: groups, loading } = useGetGroupAccount(accountId, {
    enabled: !!accountId,
    loadingConfig: { displayLoader: false },
  });

  const handleToggle = (index: number) => {
    state[index].selected = !!!state[index].selected;
    setState([...state]);
  };

  useEffect(() => {
    if (groups) setState([...groups]);
  }, [groups]);

  useEffect(() => {
    handleSelectAll(true);
  }, [accountId]);

  useEffect(() => {
    if (clearFlag && updateClearFlag) {
      handleSelectAll(true);
      updateClearFlag(false);
    }
  }, [clearFlag]);

  useEffect(() => {
    const selected = state.reduce<string[]>((val, item) => {
      item.selected && val.push(item.id);
      return val;
    }, []);
    setValue([...selected]);
  }, [state]);

  const handleSelectAll = (clear = false) => {
    const val = isAllSelected.current;
    setState((list) =>
      list.map((item) => ({ ...item, selected: item.totalContacts ? (clear ? false : !val) : false }))
    );
    isAllSelected.current = !isAllSelected.current;
  };

  const emptyAccount = !accountId ? "No account Selected. " :'';
  const desc =!accountId ? "Select an account to continue.": "";
  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 rounded-md max-h-[30rem] overflow-y-auto">
 {   accountId &&  <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold text-black">Groups ({state.length} Groups)</h2>
        <button onClick={() => handleSelectAll()} className="text-orange-500 hover:underline">
          Select All Groups
        </button>
      </div>}
      <div className="p-2">
        {/* handle empty state and no accountId state  */}
        {loading ? <div className="items-center justify-center flex fle">
        <LoadingIndicator /></div> : state.length ? <>
          {state.map((list, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
              <div>
                <p className="text-xs font-medium">{list.name}</p>
                <p className="text-xs text-gray-500">{list.totalContacts} Contacts</p>
              </div>
              <button
                disabled={list.totalContacts < 1}
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
        </>: <EmptyState  title={emptyAccount} text={desc} padding="py-2" />}
      </div>
    </div>
  );
}
