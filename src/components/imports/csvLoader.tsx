import { ContactAccount } from "@/typings/interface/account";
import Image from "next/image";
import { isPhone, isValidName } from "@/core/validators/validateData";

import * as XLSX from "xlsx";
import Button from "../button/button";
import UploadBox from "../common/file/uploadBox";

interface IProps {
  onFileUpload: (data: ContactAccount[]) => void;
}

export default function CSVLoaderComponent({ onFileUpload }: IProps) {
  const handleFileUpload = (files: File[]) => {
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryStr = e.target?.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rawData = XLSX.utils.sheet_to_json<string[]>(sheet, { header: 1 });
        if (rawData.length < 2) return [];
        const data: ContactAccount[] = rawData.slice(1).map((item) => ({
          name: `${item[0] ?? ""}`,
          phoneNumber: `${item[1] ?? ""}`,
          email: `${item[2] ?? ""}`,
        }));
        onFileUpload(data.filter((item) => isPhone(item.phoneNumber ?? "") && isValidName(item.name ?? "")));
      };
      reader.readAsBinaryString(file);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md w-full rounded-lg p-6">
        <UploadBox
          title="Click to upload"
          description="CSV or XLSX files only"
          accept=".csv, .xlsx"
          displayButton
          onFilesSelect={handleFileUpload}
        />
      </div>
    </div>
  );
}
