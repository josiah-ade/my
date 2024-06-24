// components/FileUpload.tsx
import { UploadDel, UploadRefresh } from "@/core/const/icons/icons";
import {
  FileUploadProps,
  FileUpload as FileUploadType,
} from "@/core/types/data.interface";
import Image from "next/image";

import React from "react";

function FileUpload({ uploads, onFileSelect, onRetry }: FileUploadProps) {
  return (
    <div className="p-6">
      {/* <div className="flex flex-col items-center justify-center border-dashed border-2 border-red-400 p-6 rounded-md">
        <img
          src="/document-icon.png"
          alt="Uploading Document"
          className="w-16 h-16 mb-4"
        />
        <div className="relative w-full h-2 bg-orange-200 rounded-full overflow-hidden mb-2">
          <div
            className="absolute top-0 left-0 h-full bg-orange-500"
            style={{ width: "65%" }}
          ></div>
        </div>
        <p className="text-lg font-semibold mb-2">65%</p>
        <p className="text-sm text-gray-700">Uploading Document...</p>
        <p className="text-sm text-gray-500">{uploads[0].name}</p>
      </div> */}

      {/* <div className="mb-4">
        <input
          type="file"
          multiple
          onChange={(e) => e.target.files && onFileSelect(e.target.files)}
          className="hidden"
        />
        <button
          onClick={() =>
            document
              .querySelector<HTMLInputElement>("input[type=file]")
              ?.click()
          }
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Upload Image/Videos
        </button>
      </div> */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <h2 className="text-sm text-gray-500">Uploaded Files</h2>
          <div className="h-5 w-5 p-2 flex justify-center items-center rounded-full bg-primary">
            <span className="text-xs text-white">
              {uploads ? uploads.length : 0}
            </span>
          </div>
        </div>
        <div className="space-y-4">
          {uploads.map((upload) => (
            <div
              key={upload.id}
              className="border p-4 rounded flex items-center space-x-4"
            >
              {upload.status !== "error" ? (
                <div className="w-15 h-15 p-2 rounded-full bg-success-50 flex items-center justify-center">
                  {upload.status !== "success" ? (
                    <span>...</span>
                  ) : (
                    <Image
                      src="/check-circle.png"
                      alt="check"
                      width={20}
                      height={20}
                    />
                  )}
                </div>
              ) : (
                <div className="w-15 h-15 p-2 rounded-full bg-error-50 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.30817 16.1777L9.61933 4.40456C10.6232 2.53182 13.3768 2.53181 14.3807 4.40456L20.6918 16.1777C21.6246 17.9176 20.3276 20 18.3112 20H5.68884C3.67243 20 2.37544 17.9176 3.30817 16.1777ZM12 6C12.5523 6 13 6.44772 13 7V14C13 14.5523 12.5523 15 12 15C11.4477 15 11 14.5523 11 14V7C11 6.44772 11.4477 6 12 6ZM10.75 16.75C10.75 17.4404 11.3096 18 12 18C12.6904 18 13.25 17.4404 13.25 16.75C13.25 16.0596 12.6904 15.5 12 15.5C11.3096 15.5 10.75 16.0596 10.75 16.75Z"
                      fill="#D42620"
                    />
                  </svg>
                </div>
              )}
              <div className="flex-1">
                <p className="font-medium text-xs">{upload.name}</p>
                <p className="text-sm text-gray-500">
                  {(upload.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {upload.status === "uploading" && (
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-[#FCD2C2] h-2 rounded-full">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${upload.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-500">{upload.progress}%</span>
                  </div>
                )}
                {upload.status === "success" && (
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500 cursor-pointer">
                      <UploadDel className="text-primary" />
                    </span>
                    <span className="cursor-pointer">
                      <Image
                        src="/upload-download.png"
                        height={18}
                        width={15}
                        alt="download"
                      />
                    </span>
                  </div>
                )}
                {upload.status === "error" && (
                  <div className=" space-x-2">
                    <div
                      className="flex items-center"
                      onClick={() => onRetry(upload)}
                    >
                      <span className="text-red-500">
                        <UploadRefresh className="text-primary" />
                      </span>
                      <button className="text-primary text-xs font-semibold">
                        Try Again
                      </button>
                    </div>
                    <p className="text-red-500 text-sm">{upload.error}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
