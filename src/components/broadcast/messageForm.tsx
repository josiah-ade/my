import React, {  useRef } from "react";
import { QuesCircle } from "@/core/const/icons/icons";

interface MessageFormProps {
  onChange: (data: { name: string; value: string }) => void;
  formValue: string;
  broadcastType: string;
}

export default function MessageForm(props: MessageFormProps) {
  const { broadcastType, onChange, formValue } = props;

  const textInputRef = useRef<HTMLTextAreaElement>(null);
  const placeholders = [
    { title: "Name", value: "name" },
    { title: "Phone Number", value: "phoneNumber" },
  ];

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    onChange({ name, value });
  }

  const insertPlaceholder = (text: string) => {
    if (!textInputRef.current) return;

    const textarea = textInputRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;

    textarea.setRangeText(`{{${text}}}`, startPos, endPos, "end");
    textarea.focus();

    const event = new Event("change", { bubbles: true });
    textarea.dispatchEvent(event);
  };

  return (
    <>
      <div className="mb-4">
        <label htmlFor="message" className="block text-sm font-medium text-gray-600 mb-3">
          Type Your Message
        </label>
        <textarea
          id="message"
          name="text"
          ref={textInputRef}
          onChange={handleInputChange}
          value={formValue}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none"
          rows={8}
        ></textarea>
      </div>
      {broadcastType != "group" && (
        <div className="flex justify-between mb-4">
          <div className="flex items-center gap-2 flex-wrap text-xs lg:text-sm text-white">
            {placeholders.map((item) => (
              <span
                key={item.value}
                onClick={() => insertPlaceholder(item.value)}
                className="bg-secondary-400 cursor-pointer px-3 py-1 rounded-xl"
              >
                {item.title}
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-1 ">
            <span>
              <QuesCircle />
            </span>
            <span className="text-xs text-gray-500">What are these</span>
          </div>
        </div>
      )}

    </>
  );
}
