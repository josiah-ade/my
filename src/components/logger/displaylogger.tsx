import React from "react";
import EmptyState from "../common/empty/empty";
import { useGetTemplate } from "@/providers/hooks/query/template";
import { ITemplate } from "@/typings/interface/templates";
import TemplateAction from "./actions";


interface singlrProps {
  setSingleUserData: (data: any) => void;
  singleUserData?: ITemplate;
}

function DisplayLogger(props: singlrProps) {
  const { setSingleUserData } = props;
  const { data: templateList } = useGetTemplate({ loadingConfig: { displayLoader: false } });
  return (
    <div className="w-full mt">
      {templateList && templateList.length > 0 ? (
        <>
          <div className="bg-gray-50 p-3 divide-y divide-gray-200 mt-10">
            <h2 className="text-xs font-semibold">Template Name</h2>
          </div>
          <div>
            {templateList.map((item) => (
              <div key={item.id} className="flex flex-row justify-between items-center p-3 border-b border-gray-300">
                <h3 className="text-sm font-[500]">{item.name}</h3>
                <div>
                  <TemplateAction item={item} setSingleUserData={setSingleUserData} />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

export default DisplayLogger;
