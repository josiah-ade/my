// components/FileUpload.tsx
import {
  FileUploadProps,
  FileUpload as FileUploadType,
} from "@/core/types/data.interface";

import React from "react";

function FileUpload({ uploads, onFileSelect, onRetry }: FileUploadProps) {
  return (
    <div className="p-6">
      <div className="mb-4">
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
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-4">Uploaded Files</h2>
        <div className="space-y-4">
          {uploads.map((upload) => (
            <div
              key={upload.id}
              className="border p-4 rounded flex items-center space-x-4"
            >
              <div className="flex-1">
                <p className="font-medium">{upload.name}</p>
                <p className="text-sm text-gray-500">
                  {(upload.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {upload.status === "uploading" && (
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 h-2 rounded-full">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${upload.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-500">{upload.progress}%</span>
                  </div>
                )}
                {upload.status === "success" && (
                  <span className="text-green-500">✔</span>
                )}
                {upload.status === "error" && (
                  <div className="flex items-center space-x-2">
                    <span className="text-red-500">✖</span>
                    <button
                      onClick={() => onRetry(upload)}
                      className="text-blue-500 underline"
                    >
                      Try Again
                    </button>
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
