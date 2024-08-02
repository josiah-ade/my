import { useEffect, useRef, useState } from "react";
import { LuDot } from "react-icons/lu";

interface IProps<T> {
  title?: string;
  actionText: string;
  items: T[];
  textField: keyof T;
  idField: keyof T;
}
export default function InlinePopover<T>(props: IProps<T>) {
  const [showPopover, setShowPopover] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      <button type="button" className="text-blue-600 hover:underline" onClick={() => setShowPopover((val) => !val)}>
        {props.actionText}
      </button>
      {showPopover && (
        <div
          ref={dropdownRef}
          className="absolute mt-2 w-fit rounded-md shadow-xl bg-white ring-1 ring-black ring-opacity-5 px-4 py-3  z-[1000]"
        >
          {props.title && <p className="text-gray-800 font-bold"> {props.title} </p>}
          <ul className="py-1 list-disc" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {props.items.map((item) => (
              <li key={item[props.idField] as string} className="text-sm text-gray-500 flex flex-row gap-1">
                <div className="mt-1">
                  <LuDot />
                </div>
                <p className="block">{item[props.textField] as string}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
