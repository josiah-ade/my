import AutomationTableActionComponent from "@/components/automation/tableaction";
import LoadGroupAutomation from "@/components/automation/template/loadgroupsaction";
import AutomationTemplateTableAction from "@/components/automation/template/tableaction";
import PageHeading from "@/components/common/text/pageHeading";
import TextInput from "@/components/input/textInput";
import Table from "@/components/table";
import UserLayout from "@/layout/user";
import { AutomatiomTemplate } from "@/typings/interface/automation";
import { TableHeader } from "@/typings/interface/component/table";
import { useRouter } from "next/router";
import { CiSearch } from "react-icons/ci";

export default function AutomationTemplate() {
    const router=useRouter()
    const handleSubmit = () => {
        router.push("/user/automation/template/createtemplate")

    }
    const headers: TableHeader<AutomatiomTemplate>[] = [
        { field: "templateName", title: "Template Name" },
        { field: "automationType", title: "Automation Type" },
        {
            field: "groupInAutomation", title: "Groups In Automation",
            action: { component: (props) => <AutomationTemplateTableAction {...props} /> }
        },
        { field: "timeDelivery", title: "Time Delivery", 
            action: { component: AutomationTableActionComponent,  },
        },
        { field: "groupsAutomation", title: "Groups Automation", action:{component:(props)=><LoadGroupAutomation {...props} />} },
    ];

    const data: AutomatiomTemplate[] = [
        {
            templateName: "Buyers Hq", automationType: "Time based", groupInAutomation: "Groups In Automation",
            timeDelivery: "Time Delivery", groupsAutomation: "Groups Automation",
        },
        {
            templateName: "Template Name", automationType: "Time based", groupInAutomation: "Groups In Automation",
            timeDelivery: "Time Delivery", groupsAutomation: "Groups Automation",
        },
        {
            templateName: "Template Name", automationType: "Time based", groupInAutomation: "Groups In Automation",
            timeDelivery: "Time Delivery", groupsAutomation: "Groups Automation",
        },
    ];

    return (
        <UserLayout>
            <PageHeading title={"Automation Templates"}
                description={"Add and manage your automation templates here"}
                buttonTitle="New Automation Templates" onClick={handleSubmit} />
            <div className="mt-5">
                <div className="flex flex-row justify-end items-end mb-2">
                    <TextInput name={""}
                        prefixIcon={<CiSearch size={24}
                            className="text-gray-400" />}
                        placeholder="search"
                        inputClass="md:w-[80%] w-full p-1 rounded" />
                </div>
                <Table headers={headers} data={data} />
            </div>

        </UserLayout>
    )
}