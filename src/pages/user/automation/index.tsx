import PageHeading from "@/components/common/subheadings";
import { useEffect, useState } from "react";
import { useAccountStore } from "@/providers/stores/accountStore";
import { IBroadcastLists } from "@/typings/interface/broadcasts";
import { useBroadcastStore } from "@/providers/stores/broadcastStore";
import UserLayout from "@/layout/user";
import Table from "@/components/table";
import { TableHeader } from "@/typings/interface/component/table";
import { ICreateAutomationList, IListAutomation } from "@/typings/interface/automation";
import { IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import AutomationTableActionComponent from "@/components/automation/tableaction";
import { ConfirmationProp } from "@/typings/interface/component/modal/confirmation";
import ConfirmationModal from "@/components/account/deleteConfirmationModal";
import { useGetUserAutomation } from "@/providers/hooks/query/automation";
import { useAutomationStore } from "@/providers/stores/automation";
import { useDeleteAutomation } from "@/providers/hooks/mutate/automation/list";
import useNotificationStore from "@/providers/stores/notificationStore";
import { NotificationType } from "@/core/enum/notification";
import { BroadcastTableAction } from "@/core/enum/broadcast";
import Default from "@/components/default/default";
import defaultValue from "@/core/const/automation/defaultvalue";
import RunDayDisplay from "@/components/automation/typeday";
import TimeTypeDisplay from "@/components/automation/timedisplay";

interface ModalItems {
  confirmation: boolean;
  edit: boolean;
}
let confirmationProp: ConfirmationProp = { onConfirm: () => {} };
export default function UserAutomation() {
  const setNotification = useNotificationStore((state) => state.displayNotification);
  const [modal, setModal] = useState<ModalItems>({ edit: false, confirmation: false });
  const [currentAutomation, setCurrentAutomation] = useState<IListAutomation>();
  const [showTable, setShowTable] = useState(true);
  const [formData, setFormData] = useState<ICreateAutomationList>({ ...defaultValue });
  const accounts = useAccountStore((state) => state.accounts);
  const automationType = useAutomationStore((state) => state.automation);
  const [selectAllState, setSelectAllState] = useState(false);
  const broadcastList = useBroadcastStore((state) => state.broadcasts);
  const [selectedList, setSelectedList] = useState<(IBroadcastLists & { selected?: boolean })[]>([...broadcastList]);
  const router = useRouter();
  const { data: getautomationLists } = useGetUserAutomation();
  console.log(getautomationLists);
  const { mutate: deleteAutomation } = useDeleteAutomation({
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

  const handleOpenModal = (key: keyof ModalItems) => {
    setModal((val) => ({ ...val, [key]: true }));
  };
  const handleCloseModal = (key: keyof ModalItems) => {
    currentAutomation && setCurrentAutomation(undefined);
    setModal((val) => ({ ...val, [key]: false }));
  };
  const handleRedirect = () => {
    router.push("/user/automation/list/create");
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
  const handleDelete = (item: IListAutomation) => {
    openConfirmationModal(
      "Delete Automation List",
      "Are you certain you want to delete the automation list? This will permanently erase all related contacts and information associated with this list",
      "Delete Automation",
      () => {
        handleCloseModal("confirmation"), deleteAutomation(item.id);
      }
    );
  };
  const handleEdit = (item: IListAutomation) => {
    setCurrentAutomation(item);
    router.push(`/user/automation/edit/${item.id}`);
  };

  const openConfirmationModal = (title: string, message: string, confirmText: string, onConfirm: () => void) => {
    confirmationProp = { title, message, confirmText, onConfirm };
    handleOpenModal("confirmation");
  };

  const actionLookup = {
    [BroadcastTableAction.delete]: (item: IListAutomation) => handleDelete(item),
    ["edit"]: (item: IListAutomation) => handleEdit(item),
  };

  const handleAction = (action: string, item: IListAutomation) => {
    setCurrentAutomation({ ...item });
    actionLookup[action as keyof typeof BroadcastTableAction](item);
  };

  const headers: TableHeader<IListAutomation>[] = [
    {
      field: "broadCastListId",
      title: "List",
      icon: "/chevron.jpg",
      component: (props) => <p>{props.item?.broadcast.listName}</p>,
    },
    {
      field: "accountId",
      title: "Account",
      icon: "/chevron.jpg",
      component: (props) => <p>{props.item?.account.phoneNumber}</p>,
    },
    {
      field: "type",
      title: "Automation Type",
      icon: "/chevron.jpg",
      component: (props) => <RunDayDisplay field={"type"} {...props} />,
    },
    { field: "time", title: "Time", component: (props) => <TimeTypeDisplay {...props} /> },
    { field: "daytorun", title: "Day to Run", component: (props) => <RunDayDisplay field={"daytorun"} {...props} /> },
    { field: "status", title: "Status", type: "chip" },
    {
      field: "timedelivery",
      title: "Time Delivery",
      action: { component: AutomationTableActionComponent, props: { clickHandler: handleAction } },
    },
  ];

  return (
    <UserLayout>
      <div>
        <div>
          <PageHeading
            title={"List Automations"}
            description={"Add and manage your group automations here"}
            buttonTitle={"Add List Automation"}
            onClick={handleRedirect}
          />
        </div>
        <section className="flex flex-col md:flex-row gap-12 justify-between flex-1">
          <div className="flex  flex-col md:flex-row gap-4 flex-grow">
            <div className="flex-1">
              <select
                className="w-full p-1 px-1 border border-gray-700 rounded focus:outline-none"
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
                className="w-full  p-1 px-1 border border-gray-700 rounded focus:outline-none"
              >
                <option className="px-2">{automationType.length ? "Filter by List" : "No List available"}</option>
                {automationType.map((automationType) => (
                  <option key={automationType.id} value={automationType.id}>
                    {automationType.broadcast.listName}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <select
                value={formData.type}
                onChange={handleChange}
                name="type"
                className="w-full  p-1 px-1 border border-gray-700 rounded focus:outline-none text-"
              >
                <option className="px-2">
                  {automationType.length ? "Filter by Automation Type" : "No Type available"}
                </option>
                {automationType.map((automationType) => (
                  <option key={automationType.id} value={automationType.id}>
                    {automationType.type}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <select
                onChange={handleChange}
                name="status"
                className="w-full p-1 px-1 border border-gray-700 rounded focus:outline-none"
                value={formData.status}
              >
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
            <IoSearchOutline
              className="search-icon absolute left-2 top-3 transform -translate-y-50 text-gray-600"
              size="20px"
            />
            <input
              type="search"
              id="search_query"
              placeholder="Search"
              className="search-input pl-8 w-full  border-#D0D5DD p-1 outline-gray-400 border focus:outline-none focus:border-primary"
            />
          </div>
        </section>
        <div className="mt-2">
          {getautomationLists ? (
            <Table headers={headers} data={getautomationLists} />
          ) : (
            <Default
              src="/list.png"
              alt="list"
              height={100}
              width={100}
              mainText="No List Created"
              subText="Click “create list” button to get started in creating your first broadcast list"
            />
          )}
        </div>
      </div>
      <ConfirmationModal
        isOpen={modal.confirmation}
        onClose={() => handleCloseModal("confirmation")}
        {...confirmationProp}
      />
    </UserLayout>
  );
}
