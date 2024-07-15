import { useState } from "react";
import Button from "@/components/button/button";
import UserLayout from "@/layout/user";
import { ConfirmationProp } from "@/typings/interface/component/modal/confirmation";
import Image from "next/image";
import { Copy, Plus, Bin, Pencil } from "@/core/const/icons/icons";
import { useGetUserBroadcast } from "@/providers/hooks/query/getbroadcast";
import { TableHeader } from "@/typings/interface/component/table";
import Link from "next/link";
import AccountTableActionComponent from "@/components/form/tableAction";
import Table from "@/components/table";
import { ICreateFormList, IFormList } from "@/typings/interface/form";
import EmptyState from "@/components/common/empty/empty";

interface ModalItems {
  confirmation: boolean;
  edit: boolean;
}

let confirmationProp: ConfirmationProp = { onConfirm: () => {} };

export default function UserForm() {
  const [modal, setModal] = useState<ModalItems>({ edit: false, confirmation: false });

  // const { data: broadcastList } = useGetUserBroadcast();

  const handleOpenModal = (key: keyof ModalItems) => {
    setModal((val) => ({ ...val, [key]: true }));
  };

  const handleAction = () => {
    alert("working");
  };

  const data: ICreateFormList[] = [
    {
      name: "Name",
      entries: "456",
      link: "test.com",
      description: "I am working",
      hits: "0",
      formLink: "https://pawazap/asd-w3e",
    },
  ];

  function FormActionComp({ ...props }) {
    return (
      <div {...props} className="flex items-center space-x-2">
        <Link href={`/user/form/edit-form`}>
          <span>
            <Pencil />
          </span>
        </Link>
        <span>
          <Bin />
        </span>
        <span>
          <Copy />
        </span>

        {/* <Button primary {...props}>
        View List
      </Button> */}
      </div>
    );
  }

  const headers: TableHeader<IFormList>[] = [
    { field: "name", title: "Form Name", icon: "/chevron.jpg" },
    { field: "entries", title: "Entries", icon: "/chevron.jpg" },
    { field: "hits", title: "Hits", icon: "/chevron.jpg" },
    { field: "formLink", title: "Form Link", icon: "/chevron.jpg" },
    {
      field: "view",
      title: "Action",
      action: {
        component: (props) => <FormActionComp {...props} />,
      },
    },
    {
      field: "action",
      title: "",
      action: { component: AccountTableActionComponent, props: { clickHandler: handleAction } },
    },
  ];

  return (
    <UserLayout>
      <div className="bg-white">
        <div className="flex justify-between items-center mb-4">
          <section>
            <h2 className="text-xl font-semibold text-[1.3rem]">Forms</h2>
            <p className="text[0.9rem]">Create and manage your forms here</p>
          </section>
          <section className="flex items-center space-x-2">
            <Button
              className="bg-orange-500 text-white px-4 py-2 rounded-lg"
              icon={<Plus />}
              onClick={() => handleOpenModal("edit")}
            >
              Create Form
            </Button>
          </section>
        </div>
        <section className="border border-gray-200">
          <div className="border-l-8 border-warning-500  rounded-lg p-6 flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-yellow-100 text-yellow-500 p-3 rounded-full mr-4">
                <Image src="/warning.jpg" alt="waring" width={30} height={30} />
              </div>
              <div>
                <h3 className="font-medium">Forms Usage (0/1)</h3>
                <p className="text-gray-500">Your current plan limits you to 1 form, upgrade to create more forms</p>
              </div>
            </div>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">Upgrade</button>
          </div>
        </section>
      </div>

      <Table headers={headers} data={data} />
      {/* <EmptyState /> */}
    </UserLayout>
  );
}
