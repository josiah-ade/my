import FileUpload from "@/components/broadcast/fileUpload";
import Button from "@/components/button/button";
import React, { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";

interface IProps {
  title: string;
  description: string;
  onFilesSelect: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  displayButton?: boolean;
  updateClearFlag?: Dispatch<SetStateAction<boolean>>;
  clearFlag?: boolean;
}

export default function UploadBox(props: IProps) {
  const {
    title,
    description,
    onFilesSelect,
    accept = "image/*,video/*",
    multiple = false,
    displayButton = false,
    clearFlag,
    updateClearFlag,
  } = props;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileLookup, setFileLookup] = useState<{ [key: string]: File }>({});

  const handleFileSelect = (files?: FileList) => {
    if (!files || !files.length) return;
    const file = files[0];

    if (multiple) fileLookup[file.name] = file;
    const newVal = multiple ? Object.values(fileLookup) : [file];
    onFilesSelect(newVal);
    setFileLookup({ ...fileLookup });
  };

  const handleDelete = (name: string) => {
    const file = fileLookup[name];
    if (!file) return;
    delete fileLookup[name];
    setFileLookup({ ...fileLookup });
  };

  useEffect(() => {
    if (clearFlag && updateClearFlag) {
      setFileLookup({});
      updateClearFlag(false);
    }
  }, [clearFlag]);

  const fileList = useMemo<File[]>(() => {
    return Object.values(fileLookup);
  }, [fileLookup]);

  return (
    <div className="mb-4">
      <div className="mt-1 flex flex-col gap-4 items-center justify-center px-6 py-10 border-2 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <div className="mx-auto flex items-center justify-center w-10 h-10 rounded-full p-2 bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="28" viewBox="0 0 29 28" fill="none">
              <path
                d="M7.50033 11.0835C7.50033 7.53967 10.3732 4.66683 13.917 4.66683C17.0562 4.66683 19.671 6.92221 20.2252 9.90129C20.3029 10.319 20.6016 10.6615 21.0049 10.7953C23.3275 11.5656 25.0003 13.7557 25.0003 16.3335C25.0003 19.5552 22.3887 22.1668 19.167 22.1668C18.5227 22.1668 18.0003 22.6892 18.0003 23.3335C18.0003 23.9778 18.5227 24.5002 19.167 24.5002C23.6773 24.5002 27.3337 20.8438 27.3337 16.3335C27.3337 12.959 25.2876 10.065 22.371 8.81967C21.373 5.0845 17.9674 2.3335 13.917 2.3335C9.0845 2.3335 5.16699 6.251 5.16699 11.0835C5.16699 11.2005 5.1693 11.317 5.17386 11.433C3.07922 12.6415 1.66699 14.9048 1.66699 17.5002C1.66699 21.3662 4.801 24.5002 8.66699 24.5002C9.31133 24.5002 9.83366 23.9778 9.83366 23.3335C9.83366 22.6892 9.31133 22.1668 8.66699 22.1668C6.08966 22.1668 4.00033 20.0775 4.00033 17.5002C4.00033 15.5666 5.17653 13.9051 6.85709 13.1971C7.3434 12.9923 7.63165 12.4865 7.56005 11.9637C7.52072 11.6765 7.50033 11.3827 7.50033 11.0835Z"
                fill="#475367"
              />
              <path
                d="M13.7252 16.6282C14.1673 16.2353 14.8334 16.2353 15.2754 16.6282L17.0254 18.1837C17.507 18.6118 17.5504 19.3492 17.1223 19.8308C16.7478 20.2521 16.1366 20.338 15.667 20.0663V25.6668C15.667 26.3112 15.1447 26.8335 14.5003 26.8335C13.856 26.8335 13.3337 26.3112 13.3337 25.6668V20.0663C12.8641 20.338 12.2528 20.2521 11.8783 19.8308C11.4503 19.3492 11.4937 18.6118 11.9752 18.1837L13.7252 16.6282Z"
                fill="#475367"
              />
            </svg>
          </div>

          <div className="flex text-sm text-gray-600 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <p className="relative cursor-pointer rounded-md font-medium text-primary text-xs focus-within:outline-none">
              <span>{title}</span>
              <input
                name="files"
                type="file"
                className="sr-only hidden"
                ref={fileInputRef}
                accept={accept}
                multiple={multiple}
                onChange={(e) => handleFileSelect(e.target.files ?? undefined)}
              />
            </p>
            <p className="pl-1 text-xs">{"or drag and drop"}</p>
          </div>
          <p className="text-xs text-gray-500">{description}</p>
        </div>

        {displayButton && (
          <>
            <div className="flex w-full items-center gap-2">
              <div className="flex-grow border-b-2 border-gray-100"> </div>
              {/* <hr /> */}
              <p className="text-xs flex-shrink text-gray-400">OR</p>
              <div className="flex-grow border-b-2 border-gray-100"> </div>
            </div>
            <Button primary onClick={() => fileInputRef.current?.click()}>
              Browse Files
            </Button>
          </>
        )}
      </div>

      <FileUpload uploads={fileList} onDelete={handleDelete} />
    </div>
  );
}
