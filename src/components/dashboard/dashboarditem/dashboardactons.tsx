import BroadCastList from "@/components/common/broadcasts/broadcast";
import ContactList from "@/components/common/contacts/contacts";
import CreateForm from "@/components/common/form/createform";
import Automations from "@/components/common/message_Automation/message";
import Link from "next/link";

export default function DashBoardAction() {
  return (
    <div className="border py-5 px-4 rounded  w-full">
      <h3 className="font-bold text-lg  py-2">Quick Actions</h3>
      <div className="py-4">
        <hr />
      </div>
      <div className="cursor-pointer ">
        <Link href={"/user/form"}>
          <CreateForm />
        </Link>
      </div>
      <div className="py-4">
        <hr />
      </div>
      <div className="cursor-pointer ">
        <Link href={"/user/contact"}>
          <ContactList />
        </Link>
      </div>
      <div className="py-4">
        <hr />
      </div>
      <div className="cursor-pointer ">
        <Link href={"/user/broadcast"}>
          <BroadCastList />
        </Link>
      </div>
      <div className="py-4">
        <hr />
      </div>
      <div className="cursor-pointer ">
        <Link href={"/user/automation"}>
          <Automations />
        </Link>
      </div>
    </div>
  );
}
