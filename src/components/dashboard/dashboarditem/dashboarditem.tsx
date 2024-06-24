import { dashboardItem } from "@/core/const/dashboard.consr";
import { dashboard } from "@/typings/interface/component/layout/menu";
import Button from "@/components/button/button";
import { Plus } from "@/core/const/icons/icons";
import { useAccountStore } from "@/providers/stores/accountStore";
import AddAccountModal from "@/components/account/addModal";
import { useState } from "react";

export default function DashBoardItems() {
  const [modal, setModal] = useState(false);

  const accounts = useAccountStore((state) => state.accounts);
  const account = accounts.filter((item) => item.status == "connected")[0] ?? accounts[0];

  return (
    <div>
      <div className="flex md:flex-row lg:flex-row sm:flex-row justify-between gap-5 xs:flex-col">
        <div className="flex flex-col md:flex-row justify-between border w-full py-3 rounded px-5 flex-wrap gap-3">
          <div>
            <h4 className="text-gray-500">Sammys Luxe Store</h4>
            <h3 className="font-bold text-2xl">Free Plan</h3>
          </div>
          <div className="text-right">
            <Button primary className=" inline-flex rounded-lg">
              Upgrade
            </Button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between border w-full py-3 rounded px-5 flex-wrap gap-3">
          <div>
            <h4 className="text-gray-500">Accounts</h4>
            <h3 className="font-bold"> {account?.phoneNumber ?? "No Active Account"} </h3>
          </div>
          <div className="text-right">
            <Button onClick={() => setModal(true)} primary icon={<Plus />} className="inline-flex rounded-lg">
              Add Account
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(8.5rem,1fr))]  gap-5 mt-7 items-center">
        {dashboardItem.map((item: dashboard) => (
          <div key={item.id} className="border py-3 px-4 rounded-2xl w-full ">
            <div className="text-start">
              <p className="text-sm text-gray-600">{item.title}</p>
              <p className="text-xl font-medium">
                {item.amount}/{item.total}
              </p>
            </div>
          </div>
        ))}
      </div>

      <AddAccountModal isOpen={modal} onClose={() => setModal(false)} />
    </div>
  );
}
