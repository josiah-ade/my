import React, { } from "react";
import { useGetTemplate } from "@/providers/hooks/query/template";
import EmptyState from "../../common/empty/empty";
import TemplateAction from "./actions";
import TextInput from "@/components/input/textInput";
import { CiSearch } from "react-icons/ci";
import { ITemplate } from "@/typings/interface/templates";

interface singlrProps{
    setSingleUserData:(data: any)=>void
    singleUserData?:ITemplate
}
export default function BroadCastTemplatesComponent(props:singlrProps) {
    const{setSingleUserData}=props
    const { data: templateList } = useGetTemplate({ loadingConfig: { displayLoader: false } });

    return (
        <div>
            <TextInput name={""}
                prefixIcon={<CiSearch size={24} className="text-gray-400" />}
                placeholder="search"
                inputClass="md:w-[80%] w-full p-1 rounded" />
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
                                        <TemplateAction item={item}
                                        setSingleUserData={setSingleUserData} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <EmptyState />
                )}
            </div>
        </div>
    );
}
