// components/Accordion.tsx
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function Accordion({ title, children, className }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`border border-gray-100 rounded-xl mb-4 ${className}`}>
      <button
        className="w-full text-left p-4 flex justify-between items-center bg-gray-50 hover:bg-gray-200 rounded-t-md focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <MdKeyboardArrowDown size={40} className="text-gray-400" />
      </button>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
}
