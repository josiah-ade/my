import React from "react";

interface IProps {
  title?: string;
  text?: string;
}
const defaultTitle = "No Content Available";
const defaultText = "There is nothing to display here at the moment.";

export default function EmptyState(props: IProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <img src="/empty-state.svg" alt="No data" className="max-w-xs" />
      <h2 className="font-medium mt-[1.9rem] mb-1">{props.title || defaultTitle}</h2>
      <p className="text-gray-500 text-sm ">{props.text || defaultText}</p>
    </div>
  );
}
