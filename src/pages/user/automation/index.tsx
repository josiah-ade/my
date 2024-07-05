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
import {  IAutomationContact, ICreateAutomationList } from "@/typings/interface/automation";
import { IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/router"
import AccountTableActionComponent from "@/components/account/tableAction";
import AutomationTableActionComponent from "@/components/automation/tableaction";
import { ConfirmationProp } from "@/typings/interface/component/modal/confirmation";
import ConfirmationModal from "@/components/account/deleteConfirmationModal";
import { useGetUserAutomation } from "@/providers/hooks/query/automation";
import EmptyState from "@/components/common/empty/empty";
import { useAutomationStore } from "@/providers/stores/automation";
 
const defaultValue: ICreateAutomationList = {
  accountId: "",
  type: "",
  tags: [],
  typeValue: 0,
  time: "",
  timeZone: "",
  status: "",
  tagCondition: "",
  files: [],
  broadCastListId: ""
};
  interface ModalItems {
    confirmation: boolean;
    edit: boolean;
  }
  let confirmationProp: ConfirmationProp = { onConfirm: () => {} };
  const options = [
    { value: '', label: 'Filter by Automation Type', icon: <CiHome /> },
    { value: '', label: 'Same Day joined', icon: <CiHome /> },
    { value: '', label: 'Immediately joined', icon: <CiHome /> },
  ];
export default function UserAutomation(){
  const [modal, setModal] = useState<ModalItems>({ edit: false, confirmation: false });
  const [currentAutomation, setCurrentAutomation] = useState<IAutomationContact>();
  const[showTable, setShowTable]=useState(true)
    const [formData, setFormData] = useState<ICreateAutomationList>({ ...defaultValue });
    const accounts = useAccountStore((state) => state.accounts);
    const automationType = useAutomationStore((state) => state.automation);
    const [selectAllState, setSelectAllState] = useState(false);
    const broadcastList = useBroadcastStore((state) => state.broadcasts);
    const [selectedList, setSelectedList] = useState<(IBroadcastLists & { selected?: boolean })[]>([...broadcastList]);
    const router = useRouter()
    const {data: automationLists}=useGetUserAutomation()
  
  const handleOpenModal = (key: keyof ModalItems) => {
    setModal((val) => ({ ...val, [key]: true }));
  };
  const handleCloseModal = (key: keyof ModalItems) => {
    currentAutomation && setCurrentAutomation(undefined);
    setModal((val) => ({ ...val, [key]: false }));
  };
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

  const handleDelete = (item: IAutomationContact) => {
    openConfirmationModal(
      "Delete Automation List",
      "Are you certain you want to delete the automation list? This will permanently erase all related contacts and information associated with this list",
      "Delete Automation",
      () => handleCloseModal("confirmation")
    );
  };
  const handleEdit = (item: IAutomationContact) => {
    setCurrentAutomation(item);
    openConfirmationModal(
      "Edit Automation List",
      "Are you sure you want to edit this automation list? This may involve changes to the automation schedule, message content, or recipient list.",
      "Edit Automation",
      () => {
        handleCloseModal("confirmation");
        router.push(`/user/automation/createautomation`);
      }
    );
  };

  const openConfirmationModal = (title: string, message: string, confirmText: string, onConfirm: () => void) => {
    confirmationProp = { title, message, confirmText, onConfirm };
    handleOpenModal("confirmation");
  };

  const actionLookup = {
    ["delete"]: (item: IAutomationContact) => handleDelete(item),
    ["edit"]: (item: IAutomationContact) => handleEdit(item),
  };

  const handleAction = (action: string, item: IAutomationContact) => {
    setCurrentAutomation({ ...item });
    actionLookup[action as keyof typeof actionLookup](item);
  };

  const headers: TableHeader<IAutomationContact>[] = [
    { field: "broadCastListId", title: "List", icon: "/chevron.jpg" },
    { field: "accountId", title: "Account", icon: "/chevron.jpg" },
    { field: "type", title: "Automation Type", icon: "/chevron.jpg" },
    {field: "time", title: "Time",},
    {field: "daytorun", title: "Day to Run",},
    {field: "status", title: "Status",},
    {field: "timedelivery", title: "Time Delivery",
      action: { component: AutomationTableActionComponent, props: { clickHandler: handleAction }  },
    },
  ];
  // const automation: IAutomationContact[] = automationLists?.map((item) => ({
  //   accountId: item.accountId ?? "",
  //   id: item.id ?? "",
  //   broadCastListId: item.broadCastListId ?? "",
  //   type: item.type ?? "",
  //   time: item.time ?? "",
  //   timeZone: item.timeZone ?? "",
  //   status: item.status ?? "",
  //   tagCondition: item.tagCondition ?? "",
  // })) ?? []

  

    return(
        <UserLayout>
        <div>
            <div>
            <PageHeading title={"List Automations"}
             description={"Add and manage your group automations here"} 
             buttontittle={"Add List Automation"} 
             onClick={handleRedirect}/>
            </div>
            <section 
            // className="grid grid-cols-1 md:grid-cols-5 gap-4"
            className="flex flex-col md:flex-row gap-12 justify-between flex-1"
            >
          <div className="flex  flex-col md:flex-row gap-4 flex-grow">
          <div className="flex-1">
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
          <div className="flex-1">
            <select
              onChange={(e) => {
                handleChange(e);
                handleSelectAll(true);
              }}
              value={formData.broadCastListId}
              name="broadCastListId"
              className="w-full p-2 border border-gray-700 rounded focus:outline-none"
            >
               <option className="px-2">{automationType.length ? "Filter by List" : "No List available"}</option>
              {automationType.map((automationType) => (
                <option key={automationType.id} value={automationType.id}>
                  {automationType.broadCastListId}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
      <select 
      value={formData.type} onChange={handleChange} className="w-full p-2 border border-gray-700 rounded focus:outline-none text-">
      <option className="px-2">{automationType.length ? "Filter by Automation Type" : "No Type available"}</option>
              {automationType.map((automationType) => (
                <option key={automationType.id} value={automationType.id}>
                  {automationType.type}
                </option>
              ))}
      </select>
          </div>
             
          <div className="flex-1">
            <select onChange={handleChange} 
            className="w-full p-2 border border-gray-700 rounded focus:outline-none"
            value={formData.status}>
            <option className="px-2">{automationType.length ? "Filter by List" : "No List available"}</option>
              {automationType.map((automationType) => (
                <option key={automationType.id} value={automationType.id}>
                  {automationType.status}
                </option>
              ))}
            </select>
          </div>
          </div>
          <div className="search-container relative"> 
      <IoSearchOutline className="search-icon absolute left-2 top-3 transform -translate-y-50 text-gray-600" size="20px" />
      <input
        type="search"
        id="search_query"
        placeholder="Search"
        className="search-input pl-8 w-full  border-#D0D5DD p-2 outline-gray-400 border focus:outline-none focus:border-primary"
      />
    </div>
        </section>
        <div className="mt-2">
          {automationLists && automationLists?.length > 0 ?
          <Table headers={headers} data={automationLists} /> : <>
          <EmptyState />
          </>}
        </div>
        </div>
        <ConfirmationModal
        isOpen={modal.confirmation}
        onClose={() => handleCloseModal("confirmation")}
        {...confirmationProp}
      />
        </UserLayout>
    )
}