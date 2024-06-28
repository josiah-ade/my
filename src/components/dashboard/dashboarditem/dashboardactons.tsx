import BroadCastList from "@/components/common/actions/broadcasts/broadcast";
import ContactList from "@/components/common/actions/contacts/contacts";
import CreateForm from "@/components/common/actions/form/createform";
import Automations from "@/components/common/actions/message_Automation/message";
import { UserRoutes } from "@/core/const/routes.const";
import Link from "next/link";

export default function DashBoardAction() {
  return (
    <div className="border py-5 px-4 rounded  w-full">
      <h3 className="font-bold text-lg  py-2">Quick Actions</h3>
      <div className="py-4">
        <hr />
      </div>
      <div className="cursor-pointer ">
        <Link href={UserRoutes.FORM}>
          <CreateForm />
        </Link>
      </div>
      <div className="py-4">
        <hr />
      </div>
      <div className="cursor-pointer ">
        <Link href={UserRoutes.CONTACTS}>
          <ContactList />
        </Link>
      </div>
      <div className="py-4">
        <hr />
      </div>
      <div className="cursor-pointer ">
        <Link href={UserRoutes.BROADCAST}>
          <BroadCastList />
        </Link>
      </div>
      <div className="py-4">
        <hr />
      </div>
      <div className="cursor-pointer ">
        <Link href={UserRoutes.LIST_AUTOMATION}>
          <Automations />
        </Link>
      </div>
    </div>
  );
}
