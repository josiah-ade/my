import PageHeading from "@/components/common/text/pageHeading";
import { ICreateBroadcastMessage } from "@/typings/interface/message";
import { useEffect, useState } from "react";
import { useAccountStore } from "@/providers/stores/accountStore";
import { IBroadcastLists } from "@/typings/interface/broadcasts";
import { useBroadcastStore } from "@/providers/stores/broadcastStore";
import UserLayout from "@/layout/user";
import { CiHome } from "react-icons/ci";
import Table from "@/components/table";
import { TableHeader } from "@/typings/interface/component/table";
import { IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import AutomationTableActionComponent from "@/components/automation/tableaction";
import { useGetGroupAutomation } from "@/providers/hooks/query/automation/group";
import { IGroupAutomation } from "@/typings/interface/automation/group";
import { UserRoutes } from "@/core/const/routes.const";
import { BroadcastTableAction } from "@/core/enum/broadcast";
import Default from "@/components/default/default";
import AutomationTableAction from "@/components/automation/group/tableaction";
import { ConfirmationProp, ModalItems } from "@/typings/interface/component/modal/confirmation";
import { useDeleteGroupAutomation } from "@/providers/hooks/mutate/automation/group";
import { useParams } from "next/navigation";
import useNotificationStore from "@/providers/stores/notificationStore";
import { NotificationType } from "@/core/enum/notification";
import ConfirmationModal from "@/components/account/deleteConfirmationModal";
import EmptyState from "@/components/common/empty/empty";
import GroupAutomationTypeDisplay from "@/core/const/automation/group/automationtypeoption";
import Modal from "@/components/modal/modal";
import GroupAutomationHistoryComponent from "@/components/automation/group/groupAutomationationHistory";

const defaultValue: ICreateBroadcastMessage = {
  list: [],
  accountId: "",
  text: "",
  type: "",
  tags: [],
  excludeList: [],
  isTest: false,
};

let confirmationProp: ConfirmationProp = { onConfirm: () => {} };
const options = [
  { value: "", label: "Filter by Automation Type", icon: <CiHome /> },
  { value: "", label: "Same Day joined", icon: <CiHome /> },
  { value: "", label: "Immediately joined", icon: <CiHome /> },
];
export default function GroupAutomation() {
  const { id } = useParams() || {};
  const setNotification = useNotificationStore((state) => state.displayNotification);
  const [showTable, setShowTable] = useState(true);
  const [formData, setFormData] = useState<ICreateBroadcastMessage>({ ...defaultValue });
  const accounts = useAccountStore((state) => state.accounts);
  const [selectAllState, setSelectAllState] = useState(false);
  const broadcastList = useBroadcastStore((state) => state.broadcasts);
  const [selectedList, setSelectedList] = useState<(IBroadcastLists & { selected?: boolean })[]>([...broadcastList]);
  const router = useRouter();
  const [currentAutomation, setCurrentAutomation] = useState<IGroupAutomation>();
  const [modal, setModal] = useState<ModalItems>({ edit: false, confirmation: false, history: false });
  const handleRedirect = () => {
    router.push("/user/automation/group/create");
  };
  const { data } = useGetGroupAutomation();
  const { mutate: deleteGroupAutomation } = useDeleteGroupAutomation({
    onSuccess: () => handleSuccess("Account deleted successfully", "Your account was deleted successfully"),
    options: { errorConfig: { title: "Failed to delete automation list" } },
  });
  const handleSuccess = (title: string, text: string) => {
    setNotification({
      type: NotificationType.success,
      content: { title, text },
    });
    handleCloseModal("confirmation");
  };

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

  const handleEdit = (item: IGroupAutomation) => {
    router.push(`${UserRoutes.GROUP_AUTOMATION}/edit/${item.id}`);
  };
  const handleOpenModal = (key: keyof ModalItems) => {
    setModal((val) => ({ ...val, [key]: true }));
  };
  const handleCloseModal = (key: keyof ModalItems) => {
    currentAutomation && setCurrentAutomation(undefined);
    setModal((val) => ({ ...val, [key]: false }));
  };
  const openConfirmationModal = (title: string, message: string, confirmText: string, onConfirm: () => void) => {
    confirmationProp = { title, message, confirmText, onConfirm };
    handleOpenModal("confirmation");
  };
  const handleDelete = (item: IGroupAutomation) => {
    openConfirmationModal(
      "Delete Automation List",
      "Are you certain you want to delete the automation list? This will permanently erase all related contacts and information associated with this list",
      "Delete Automation",
      () => {
        handleCloseModal("confirmation"), deleteGroupAutomation(item.id);
      }
    );
  };

  const actionLookup = {
    // [BroadcastTableAction.delete]: (item: IGroupAutomation) => handleDelete(item),
    ["edit"]: (item: IGroupAutomation) => handleEdit(item),
    ["history"]: (item: IGroupAutomation) => handleOpenModal("history"),
    ["delete"]: (item: IGroupAutomation) => handleDelete(item),
  };

  const handleAction = (action: string, item: IGroupAutomation) => {
    setCurrentAutomation({ ...item });
    actionLookup[action as keyof typeof actionLookup](item)
  };

  const headers: TableHeader<IGroupAutomation>[] = [
    {
      field: "list",
      title: "Groups in Automation",
      icon: "/chevron.jpg",
      action: { component: (props) => <AutomationTableAction {...props} /> },
    },
    { field: "account", title: "Account", component: (props) => <p>{props.item?.account.phoneNumber}</p> },
    { field: "type", title: "Automation Type", component: (props) => <GroupAutomationTypeDisplay {...props} /> },
    { field: "status", title: "Status", type: "chip" },
    {
      field: "history",
      title: "Delivery Status",
      component: (props) => <span onClick={() => props.item && handleAction("history", props.item)}> View </span>,
    },
    {
      field: "action",
      title: "",
      action: { component: AutomationTableActionComponent, props: { clickHandler: handleAction } },
      // action: { component: AutomationTableActionComponent,  },
    },
  ];

  return (
    <UserLayout>
      <div>
        <div>
          <PageHeading
            title={"Group Automations"}
            description={"Add and manage your group automations here"}
            buttonTitle={"Add Group Automation"}
            onClick={handleRedirect}
          />
        </div>
        <section
          // className="grid grid-cols-1 md:grid-cols-5 gap-4"
          className="flex flex-col md:flex-row gap-12 justify-between flex-1"
        >
          <div className=" flex  flex-col md:flex-row gap-4 flex-grow ">
            <div className="flex-span-1">
              <select
                className="w-full p-2 px-2 border bg-white border-gray-300 rounded focus:outline-none "
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
                className="w-full p-2 border border-gray-300 bg-white rounded focus:outline-none"
              >
                <option>Filter by List</option>
                <option value="list">List</option>
                <option value="group">Groups</option>
              </select>
            </div>
            <div className="flex-span-1">
              <select
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 bg-white rounded focus:outline-none text-"
              >
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
              <select onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:outline-none">
                <option value="">Filter by Status</option>
              </select>
            </div>
          </div>
          <div className="search-container relative">
            <IoSearchOutline
              className="search-icon absolute left-2 top-3 transform -translate-y-50 text-gray-600"
              size="20px"
            />
            <input
              type="search"
              id="search_query"
              placeholder="Search"
              className="search-input pl-8  border-#D0D5DD p-2 outline-gray-400 border focus:outline-none focus:border-primary"
            />
          </div>
        </section>
        <div className="mt-2">
          {data && data.length > 0 ? (
            <Table headers={headers} data={data} />
          ) : (
            <EmptyState
              title="No Automation added"
              text="Click “add Group Automation” button to get started in adding your first automation"
            />
          )}
        </div>
        <ConfirmationModal
          isOpen={modal.confirmation}
          onClose={() => handleCloseModal("confirmation")}
          {...confirmationProp}
        />
      </div>

      <Modal displayClose isOpen={modal.history} title="Delivery Status" onClose={() => handleCloseModal("history")}>
        {currentAutomation && <GroupAutomationHistoryComponent automation={currentAutomation} />}
      </Modal>
    </UserLayout>
  );
}
