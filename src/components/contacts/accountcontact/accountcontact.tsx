import Modal from "@/components/modal/modal";
import Tabs from "@/components/tab/Tab";
import Table from "@/components/table";
import { ContactAccount, IAccount } from "@/typings/interface/account";
import { TableHeader } from "@/typings/interface/component/table";
import { useParams } from "next/navigation";
import { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlinePostAdd } from "react-icons/md";
import AddExistingList from "../form/addtoexistlist";
import AddNewList from "../form/addtonewlist";
import { useGetUserBroadcast } from "@/providers/hooks/query/getbroadcast";
import Button from "@/components/button/button";
import { GoPlus } from "react-icons/go";
import EmptyState from "@/components/common/empty/empty";
import AddExistingBroadcastList from "@/components/broadcast/addtext";
import { IBroadcastLists } from "@/typings/interface/broadcasts";

interface IProps {
  title?: string;
  text?: string;
  titleClass?: string;
  btnText?: string;
  isGroup?: boolean;
  contactAccount: ContactAccount[];
  addContact?: boolean;
  selectedList?: IBroadcastLists;
  selectedAutomationDay?: number;
}

export default function AccountForm(props: IProps) {
  const { title, isGroup, contactAccount, btnText, titleClass, selectedList, selectedAutomationDay } = props;
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams() ?? {};
  const { data: broadcastList = [] } = useGetUserBroadcast({ loadingConfig: { displayLoader: false } });
  const [selectedContacts, setSelectedContacts] = useState<ContactAccount[]>([]);
  const handleModal = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const headers: TableHeader<ContactAccount>[] = [
    { field: "phoneNumber", title: "Phone Number" },
    { field: "country", title: "Country" },
    { field: "name", title: "Name", sortable: true },
  ];

  const tabs = [
    {
      label: "Add to a New List",
      icon: <IoAddCircleOutline />,
      content: selectedContacts ? <AddNewList selectedContacts={selectedContacts} handleClose={handleClose} /> : <></>,
    },
    {
      label: "Add to an Existing List",
      icon: <MdOutlinePostAdd />,
      content: selectedContacts ? (
        <AddExistingList selectedContacts={selectedContacts} handleClose={handleClose} broadcastList={broadcastList} />
      ) : (
        <></>
      ),
    },
  ];

  return (
    <div>
      <div className="mt-5 flex flex-row justify-between">
        <div>
          <h1 className={`font-bold text-2xl ${titleClass}`}> {props.title}</h1>
          <p className="text-gray-600"> {props.text}</p>
          <p className="mt-2">{props.isGroup}</p>
        </div>
        <div>
          <Button onClick={handleModal} disabled={!selectedContacts.length} primary icon={<GoPlus />}>
            {btnText ? btnText : "Add to List"}
          </Button>
        </div>
      </div>
      <div className="mt-5">
        {contactAccount && contactAccount.length ? (
          <Table
            search={true}
            headers={headers}
            data={contactAccount}
            pagination={{ pageSize: 5 }}
            checkboxAction={(val) => setSelectedContacts([...val])}
          />
        ) : (
          <EmptyState />
        )}
      </div>
      <Modal isOpen={isOpen} onClose={handleClose}>
        {!selectedList ? (
          <Tabs tabs={tabs} />
        ) : (
          <div>
            <AddExistingBroadcastList
              selectedContacts={selectedContacts}
              handleClose={handleClose}
              selectedAutomationDay={selectedAutomationDay ?? 0}
              selectedBroadcastList={selectedList}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
