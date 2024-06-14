import Image from "next/image"

import React from 'react';

interface ImageProps {
  src: string;
  alt: string;
  height: number;
  width: number;
}

interface TextProps {
  mainText: string;
  subText: string;
}

const Default: React.FC<ImageProps & TextProps> = ({ src, alt, height, width, mainText, subText }) => {
  return (
    <div className="my-40 flex flex-col items-center">
      <img src={src} alt={alt} height={height} width={width} />
      <p className="text-gray-900 text-[1rem] leading-10">{mainText}</p>
      <p className="text-gray-600 text-sm">{subText}</p>
    </div>
  );
};

export default Default;