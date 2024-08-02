import { HtmlHTMLAttributes, ReactNode } from "react";

interface IProps {
  title?: string;
  text?: string;
  imgSrc?: string;
  className?: string;
  avatar?: ReactNode;
  titleComponent?: ReactNode;
  textComponent?: ReactNode;
  titleProps?: HtmlHTMLAttributes<HTMLElement>;
  textProps?: HtmlHTMLAttributes<HTMLElement>;
}

export default function InfoItem(props: IProps) {
  return (
    <div className={`flex gap-2 items-center ${props.className ?? ""}`}>
      {props.imgSrc && <img src={props.imgSrc} alt={props.title ?? "info_image"} />}
      {props.avatar && props.avatar}
      <div>
        {props.title && (
          <p className="text-sm font-medium text-gray-900" {...props.titleProps}>
            {props.title}
          </p>
        )}
        
        {props.titleComponent && props.titleComponent}

        {props.text && (
          <p className="text-xs break-all text-gray-700" {...props.textProps}>
            {props.text}
          </p>
        )}
        {props.textComponent && props.textComponent}
      </div>
    </div>
  );
}
