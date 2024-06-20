// components/Default.tsx
import Image from "next/image";
import React, { ReactNode } from "react";
import Button from "../button/button";

interface ImageProps {
  src: string;
  alt: string;
  height: number;
  width: number;
  btn?: boolean;
  imgE?: ReactNode;
  btnText?: string;
  primary?: boolean;
}

interface TextProps {
  mainText: string;
  subText: string;
}

const Default: React.FC<ImageProps & TextProps> = ({
  src,
  alt,
  height,
  btnText,
  width,
  imgE,
  primary,
  mainText,
  subText,
  btn,
}) => {
  return (
    <div className="flex flex-col items-center p-10">
      <Image src={src} alt={alt} height={height} width={width} />
      <p className="text-gray-900 text-base mt-2 leading-8">{mainText}</p>
      <p className="text-gray-600 text-sm">{subText}</p>
      <div className="mt-8">
        {btn ? (
          <Button
            className={`${
              primary ? "" : "border-2 border-gray-400"
            } text-sm text-gray-600 `}
            primary={primary}
            icon={imgE}
          >
            {btnText}
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default Default;
