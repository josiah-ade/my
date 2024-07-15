// components/FileUpload.tsx
import { UploadDel } from "@/core/const/icons/icons";
import Image from "next/image";

interface IProps {
  uploads: File[];
  onDelete: (name: string) => void;
}

function FileUpload({ uploads, onDelete }: IProps) {
  const handleDelete = (index: number) => {
    onDelete(uploads[index].name);
  };

  return (
    <div className="p-6">
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <h2 className="text-sm text-gray-500">Uploaded Files</h2>
          <div className="h-5 w-5 p-2 flex justify-center items-center rounded-full bg-primary">
            <span className="text-xs text-white">{uploads ? uploads.length : 0}</span>
          </div>
        </div>
        <div className="space-y-4">
          {uploads.map((upload, index) => (
            <div key={upload.name} className="border p-4 rounded flex items-center gap-x-4">
              <Image src="/check-circle.png" alt="check" width={20} height={20} />
              <div className="flex-1">
                <p className="font-medium text-xs break-all ">{upload.name}</p>
                <p className="text-sm text-gray-500">{(upload.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>

              <span className="text-green-500 self-start cursor-pointer">
                <UploadDel className="text-primary" onClick={() => handleDelete(index)} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
