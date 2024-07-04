import PageHeading from "@/components/common/subheadings";
import { ICreateBroadcastMessage } from "@/typings/interface/message";
import { useEffect, useState } from "react";
import { useAccountStore } from "@/providers/stores/accountStore";
import { IBroadcastLists } from "@/typings/interface/broadcasts";
import { useBroadcastStore } from "@/providers/stores/broadcastStore";
import UserLayout from "@/layout/user";
import { CiHome } from "react-icons/ci";
import Table from "@/components/table";
import { TableHeader } from "@/typings/interface/component/table";
import { IAutomation, IAutomationContact } from "@/typings/interface/automation";
import { IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/router"
import AccountTableActionComponent from "@/components/account/tableAction";
import AutomationTableActionComponent from "@/components/automation/tableaction";


const defaultValue: ICreateBroadcastMessage = {
    list: [],
    accountId: "",
    text: "",
    type: "",
    tags: [],
    excludeList: [],
    isTest: false,
  };

  const options = [
    { value: '', label: 'Filter by Automation Type', icon: <CiHome /> },
    { value: '', label: 'Same Day joined', icon: <CiHome /> },
    { value: '', label: 'Immediately joined', icon: <CiHome /> },
  ];
export default function GroupAutomation(){
  const[showTable, setShowTable]=useState(true)
    const [formData, setFormData] = useState<ICreateBroadcastMessage>({ ...defaultValue });
    const accounts = useAccountStore((state) => state.accounts);
    const [selectAllState, setSelectAllState] = useState(false);
    const broadcastList = useBroadcastStore((state) => state.broadcasts);
    const [selectedList, setSelectedList] = useState<(IBroadcastLists & { selected?: boolean })[]>([...broadcastList]);
    const router = useRouter()
    const handleRedirect = () => {
        router.push("/user/automation/createautomation")
    }
    useEffect(() => {
        !selectedList.length && setSelectedList(broadcastList);
      }, [broadcastList]);
      
    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { value, name } = event.target;
    value != undefined && updateFormState({ name, value });
  }
  const updateFormState = ({ name, value }: { name: string; value: string }) => {
    setFormData({ ...formData, [name]: value });
  };

    const handleSelectAll = (clear = false) => {
    setSelectAllState((val) => {
      setSelectedList((list) =>
        list.map((item) => ({ ...item, selected: item.contacts ? (clear ? false : !val) : false }))
      );
      return !val;
    });
  };
  const headers: TableHeader<IAutomation>[] = [
    { field: "list", title: "List", icon: "/chevron.jpg" },
    { field: "account", title: "Account", icon: "/chevron.jpg" },
    { field: "automationType", title: "Automation Type", icon: "/chevron.jpg" },
    {field: "time", title: "Time",},
    {field: "daytorun", title: "Day to Run",},
    {field: "status", title: "Status",},
    {field: "timedelivery", title: "Time Delivery",
      // action: { component: AutomationTableActionComponent,  },
    },
  ];

  const data:IAutomation[]=[
    {
      list: "Buyers",
      account: "+234 967 654 4457",
      automationType: "Day 12",
      time: "14:32 GMT+1",
      daytorun: "Day 12",
      status: "Active",
      timedelivery: "",
    },
    {
      list: "Buyers",
      account: "+234 967 654 4457",
      automationType: "Day 12",
      time: "14:32 GMT+1",
      daytorun: "Day 12",
      status: "Active",
      timedelivery: "",
    }
  ]
  console.log("automation",data)

    return(
        <UserLayout>
        <div>
            <div>
            <PageHeading title={"Group Automations"}
             description={"Add and manage your group automations here"} 
             buttontittle={"Add List Automation"} 
             onClick={handleRedirect}/>
            </div>
            <section 
            // className="grid grid-cols-1 md:grid-cols-5 gap-4"
            className="flex flex-row gap-4 justify-between"
            >
          <div className="flex flex-row gap-4 ">
          <div className="flex-span-1">
            <select
              className="w-full p-2 px-2 border border-gray-700 rounded focus:outline-none"
              name="accountId"
              onChange={handleChange}
              value={formData.accountId}
            >
              <option className="px-2">{accounts.length ? "Filter by Account" : "No account available"}</option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.phoneNumber}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-span-1">
            <select
              onChange={(e) => {
                handleChange(e);
                handleSelectAll(true);
              }}
              value={formData.type}
              name="type"
              className="w-full p-2 border border-gray-700 rounded focus:outline-none"
            >
              <option>Filter by List</option>
              <option value="list">List</option>
              <option value="group">Groups</option>
            </select>
          </div>
          <div className="flex-span-1">
      <select onChange={handleChange} className="w-full p-2 border border-gray-700 rounded focus:outline-none text-">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            <div className="flex items-center">
              {option.icon && <span className="mr-2">{option.icon}</span>}
              {option.label}
            </div>
          </option>
        ))}
      </select>
          </div>
             
          <div className="flex-span-1">
            <select onChange={handleChange} className="w-full p-2 border border-gray-700 rounded focus:outline-none">
              <option value="">Filter by Status</option>
            </select>
          </div>
          </div>
          <div className="search-container relative"> 
      <IoSearchOutline className="search-icon absolute left-2 top-3 transform -translate-y-50 text-gray-600" size="20px" />
      <input
        type="search"
        id="search_query"
        placeholder="Search"
        className="search-input pl-8  border-#D0D5DD p-2 outline-gray-400 border focus:outline-none focus:border-primary"
      />
    </div>
        </section>
        <div className="mt-2">
          {showTable ?
          <Table headers={headers} data={data} /> : <></>}
        </div>
        </div>
        </UserLayout>
    )
}