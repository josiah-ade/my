import React, { useState, useEffect, useCallback } from "react";
import Button from "../button/button";
import Image from "next/image";
import { WhatsappContact } from "@/core/types/data.interface";
import Table from "../table/index";
import { TableHeader } from "@/typings/interface/component/table";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { Contact } from "@/typings/interface/contacts";
import AccountForm from "../contacts/accountcontact/accountcontact";
import { isPhone, isValidName } from "@/core/validators/validateData";
import { getExcelData } from "@/providers/services/excelMockData";
import useNotificationStore from "@/providers/stores/notificationStore";
import { NotificationType } from "@/core/enum/notification";

const FileUpload: React.FC<{ onFileUpload: (data: unknown[]) => void }> = ({ onFileUpload }) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryStr = e.target?.result;
        if (file.type === "text/csv") {
          Papa.parse(binaryStr as string, {
            // header: true,
            complete: (results: { data: unknown[][] }) => {
              const columnArr = results.data.map((item: unknown[]) => {
                return {
                  name: item[0],
                  phoneNumber: item[1],
                };
              });
              onFileUpload(columnArr);
            },
          });
        } else if (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
          const workbook = XLSX.read(binaryStr, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const data = XLSX.utils.sheet_to_json(sheet);
          onFileUpload(data);
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-md hover:border-blue-500 transition-colors duration-200">
          <div className="text-center m-auto flex flex-col items-center justify-center ">
            <div className="border-2 border-red h-10 w-10 p-2 rounded-full bg-gray-100 flex items-center justify-center">
              <Image src="/cloud-upload.png" alt="upload" width={30} height={30} />
            </div>
            <p className="text-sm text-gray-600">
              <span className="text-primary cursor-pointer hover:underline">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">CSV or XLSX files only</p>
          </div>
        </div>
        <div className="mt-4 text-center flex items-center justify-center">
          <Button primary className="px-4 py-2 rounded-md focus:ring-opacity-75">
            <input type="file" accept=".csv, .xlsx" onChange={handleFileUpload} />
          </Button>
        </div>
      </div>
    </div>
  );
};

interface ExcelData {
  name: string;
  phoneNumber: string;
}

export default function CSV() {
  const [excelData, setExcelData] = useState<ExcelData[]>();
  const [showTable, setShowTable] = useState(false);
  const [data, setData] = useState([]);
  const [search] = useState(true);
  const setNotification = useNotificationStore((state) => state.setDisplay);

  useEffect(() => {
    setExcelData(getExcelData());
  }, []);

  const exportSampleTemplate = useCallback(() => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SampleContact");
    XLSX.writeFile(wb, "SampleContact.xlsx");
    setNotification(true, {
      type: NotificationType.success,
      content: {
        title: "Sample Template Downloaded",
        text: `you have successfully downloaded the sample template`,
      },
    });
  }, [excelData]);

  const headers: TableHeader[] = [
    { field: "phoneNumber", title: "Phone Number", icon: "/chevron.jpg" },
    { field: "name", title: "Name", icon: "/chevron.jpg" },
    { field: "country", title: "Country", icon: "/chevron.jpg" },
    { field: "select", title: "Select", icon: "/chevron.jpg" },
  ];

  const handleFileUpload = (uploadedData: React.SetStateAction<never[]>) => {
    setData(uploadedData);
    setShowTable(true);
  };

  data.filter((item) => isPhone(item.phoneNumber) && isValidName(item.name));

  return (
    <section>
      <section className="flex justify-between items-center mt-12">
        <div>
          <h2 className="text-lg font-bold">Import from CSV or XLSX File </h2>
          <p className="text-gray-600 text-sm">Import contact details from a file </p>
        </div>
        <div>
          <Button primary>Import</Button>
        </div>
      </section>
      <div className="flex items-center justify-between p-2 mt-6 border-l-8 border-l-[#0D5EBA] bg-white border rounded shadow-sm">
        <div className="flex items-center p-2 justify-center space-x-4">
          <div className="bg-[#C6DDF7] h-4 w-4 rounded-full p-2">
            <Image src="/check-circle.png" alt="check" width={40} height={40} />
          </div>
          <span className="text-gray-900 text-base font-bold">Download our supported csv/xlsx format template</span>
        </div>
        <p onClick={exportSampleTemplate} className="text-orange-500 cursor-pointer hover:underline">
          Download Template
        </p>
      </div>

      <section className="mt-10">
        {showTable ? (
          <AccountForm
            // text={`Import from Google Contacts`}
            // title={`Import contact details from google contacts`}
            contactAcount={data ?? []}
          />
        ) : (
          // <Table headers={headers} data={data} search={search} />
          <FileUpload onFileUpload={handleFileUpload} />
        )}
      </section>
    </section>
  );
}
