import React from "react";

interface IProps {
  title?: string;
  text?: string;
  imgSrc?: string;
  action?: React.ElementType;
  titleClass?: string;
  padding?: string;
}
const defaultTitle = "No Content Available";
const defaultText = "There is nothing to display here at the moment.";

export default function EmptyState({ padding = "py-20", ...props }: IProps) {
  return (
    <div className={`flex flex-col items-center justify-center ${padding} text-center`}>
      <img src={props.imgSrc || "/empty-state.svg"} alt="No data" className="max-w-xs" />
      <h2 className={`font-medium mb-1 ${props.titleClass ?? "mt-[1.9rem]"}`}>{props.title || defaultTitle}</h2>
      <p className="text-gray-500 text-sm ">{props.text || defaultText}</p>
      {props.action ? (
        <div className="mt-5">
          <props.action />
        </div>
      ) : null}
    </div>
  );
}
