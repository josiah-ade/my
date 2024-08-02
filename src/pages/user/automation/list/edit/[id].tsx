import { useGetSingleAutomationList } from "@/providers/hooks/query/automation/automation";
import CreateAutomationPage from "../create";
import { useParams } from "next/navigation";

export default function EditAutomationPage(){
    const { id }= useParams() || {};
    const {data: automationList}=useGetSingleAutomationList(id as string)
    return(
            <div>

               {automationList ? <CreateAutomationPage
                 automationList={automationList} />: <></>}
            </div>
    )
}