import { data, headers } from "@/core/const/tabledata/tab/accounts";
import Table from "../../table";
import { broadcastdata, broadcastheaders } from "@/core/const/tabledata/tab/broadcast";
import TextInput from "../../common/input/textInput";
import Select from "../../common/input/selectInput";
import { SearchIcon } from "@/core/const/icons/icons";

export const tabs = [
  {
    label: "Accounts",
    content:
      <div className="mt-5">
        <Table headers={headers} data={data} />
      </div>
  },
  {
    label: "Broadcast List",
    content:
      <div className="mt-5">
        <div className="flex flex-row justify-between">
          <Select name={"select"}
           options={[]} 
           controlField={""}
           displayField={""} inputClass="py-2 px-3" />
          <TextInput
            inputClass="py-2 px-3"
            prefixIcon={<SearchIcon className="" />}
            // onChange={handleSearch}
            name="search"
          />
        </div>
        <div className="mt-5">
          <Table headers={broadcastheaders} data={broadcastdata} />
        </div>
      </div>
  },
  {
    label: "Forms",
    //   content:<WeeklyPlan />
  },
  {
    label: "Chatbot",
    //   content:<WeeklyPlan />
  },
  {
    label: "List Automation",
    //   content:<WeeklyPlan />
  },
  {
    label: "Group Automation",
    //   content:<WeeklyPlan />
  },
  {
    label: "Automation Template",
    //   content:<WeeklyPlan />
  },
  {
    label: "Teams & Permissions",
    //   content:<WeeklyPlan />
  },
];