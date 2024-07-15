import React, { useState } from "react";
import Button from "../button/button";
import AccountForm from "../contacts/accountcontact/accountcontact";
import DownloadSampleTemplate from "../contacts/accountcontact/downloadSampleTemplete";
import { IBroadcastLists } from "@/typings/interface/broadcasts";
import CSVLoaderComponent from "./csvLoader";
import { ContactAccount } from "@/typings/interface/account";
import HeaderSection from "./headerSection";

interface IProps {
  selectedList?: IBroadcastLists;
  selectedAutomationDay?: number;
}

const title = "Import from CSV or XLSX File";
const text = "Import contact details from a file";

export default function CSV({ selectedList ,selectedAutomationDay}: IProps) {
  const [showTable, setShowTable] = useState(false);
  const [data, setData] = useState<ContactAccount[]>([]);

  const handleFileUpload = (uploadedData: React.SetStateAction<ContactAccount[]>) => {
    setData(uploadedData);
    setShowTable(true);
  };

  return (
    <section>
      {!showTable && (
        <>
          <HeaderSection title={title} text={text} />
          <DownloadSampleTemplate />
        </>
      )}

      <section className="mt-10">
        {showTable ? (
          <AccountForm
            title={title}
            titleClass="text-xl"
            text={text}
            selectedAutomationDay={selectedAutomationDay}
            contactAccount={data ?? []}
            selectedList={selectedList}
            btnText={`Import Contacts`}
          />
        ) : (
          <CSVLoaderComponent onFileUpload={handleFileUpload} />
        )}
      </section>
    </section>
  );
}
