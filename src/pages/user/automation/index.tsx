import PageHeading from "@/components/common/text/pageHeading";
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
import { useAutomationStore } from "@/providers/stores/automation";
import { useDeleteAutomation } from "@/providers/hooks/mutate/automation/list";
import useNotificationStore from "@/providers/stores/notificationStore";
import { NotificationType } from "@/core/enum/notification";
import { BroadcastTableAction } from "@/core/enum/broadcast";
import defaultValue from "@/core/const/automation/defaultvalue";
import RunDayDisplay from "@/components/automation/typeday";
import TimeTypeDisplay from "@/components/automation/timedisplay";
import EmptyState from "@/components/common/empty/empty";
import { useGetUserAutomation } from "@/providers/hooks/query/automation/automation";
import ListAutomationHistoryComponent from "@/components/automation/list/listAutomationationHistory";
import Modal from "@/components/modal/modal";

interface ModalItems {
  confirmation: boolean;
  edit: boolean;
  history: boolean;
}
let confirmationProp: ConfirmationProp = { onConfirm: () => {} };
export default function UserAutomation() {
  const setNotification = useNotificationStore((state) => state.displayNotification);
  const [modal, setModal] = useState<ModalItems>({ edit: false, confirmation: false, history: false });
  const [currentAutomation, setCurrentAutomation] = useState<IListAutomation>();
  const [formData, setFormData] = useState<ICreateAutomationList>({ ...defaultValue });
  const accounts = useAccountStore((state) => state.accounts);
  const automationType = useAutomationStore((state) => state.automation);
  const [selectAllState, setSelectAllState] = useState(false);
  const broadcastList = useBroadcastStore((state) => state.broadcasts);
  const [selectedList, setSelectedList] = useState<(IBroadcastLists & { selected?: boolean })[]>([...broadcastList]);
  const router = useRouter();
  const { data: getautomationLists } = useGetUserAutomation();

  const { mutate: deleteAutomation } = useDeleteAutomation({
    onSuccess: () => handleSuccess("Automation List Deleted", "The automation was successfully removed from your list."),
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
      " Are you certain you want to delete this automation?",
      "Delete Automation",
      () => {
        handleCloseModal("confirmation"), deleteAutomation(item.id);
      }
    );
  };
  const handleEdit = (item: IListAutomation) => {
    setCurrentAutomation(item);
    router.push(`/user/automation/list/edit/${item.id}`);
  };

  const openConfirmationModal = (title: string, message: string, confirmText: string, onConfirm: () => void) => {
    confirmationProp = { title, message, confirmText, onConfirm };
    handleOpenModal("confirmation");
  };

  const actionLookup = {
    [BroadcastTableAction.delete]: (item: IListAutomation) => handleDelete(item),
    ["edit"]: (item: IListAutomation) => handleEdit(item),
    ["history"]: (item: IListAutomation) => handleOpenModal("history"),
  };

  const handleAction = (action: string, item: IListAutomation) => {
    setCurrentAutomation({ ...item });
    actionLookup[action as keyof typeof actionLookup](item);
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
      field: "history",
      title: "Delivery Status",
      component: (props) => (
        <span className="text-primary" onClick={() => props.item && handleAction("history", props.item)}>
          {" "}
          View{" "}
        </span>
      ),
    },
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
          <div className="flex flex-col md:flex-row gap-4 flex-grow">
            <div className="flex-1">
              <select
                className="w-full p-1 px-1 border border-gray-300 bg-white rounded focus:outline-none"
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
                className="w-full  p-1 px-1 border border-gray-300 bg-white rounded focus:outline-none"
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
                className="w-full  p-1 px-1 border border-gray-300 bg-white rounded focus:outline-none text-"
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
                className="w-full p-1 px-1 border border-gray-300 bg-white rounded focus:outline-none"
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
          {getautomationLists && getautomationLists.length > 0 ? (
            <Table headers={headers} data={getautomationLists} />
          ) : (
            <EmptyState
              title="No Automation added"
              text="Click “add List Automation” button to get started in adding your first automation"
            />
          )}
        </div>
      </div>
      <ConfirmationModal
        isOpen={modal.confirmation}
        onClose={() => handleCloseModal("confirmation")}
        {...confirmationProp}
      />

      <Modal displayClose isOpen={modal.history} title="Delivery Status" onClose={() => handleCloseModal("history")}>
        {currentAutomation && <ListAutomationHistoryComponent automation={currentAutomation} />}
      </Modal>
    </UserLayout>
  );
}
