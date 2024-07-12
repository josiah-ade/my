import { ILimitData, Limit } from "@/typings/interface/component/layout/menu";
import Button from "@/components/button/button";
import { Plus } from "@/core/const/icons/icons";
import { useAccountStore } from "@/providers/stores/accountStore";
import AddAccountModal from "@/components/account/addModal";
import { useState } from "react";
import { useUsersStats } from "@/providers/hooks/query/statistics";
import { title } from "process";
import { useLimitsStore } from "@/providers/stores/statisticsStore";
import { useAuthContext } from "@/providers/context/auth";
import { dashboardItems } from "@/core/const/dashboard.consr";

export default function DashBoardItems() {
  const { auth } = useAuthContext();
  const [modal, setModal] = useState(false);
  const accounts = useAccountStore((state) => state.accounts);
  const account = accounts.filter((item) => item.status == "connected")[0] ?? accounts[0];
  const stats = useLimitsStore((state) => state.limit);


  return (
    <div>
      <div className="flex md:flex-row lg:flex-row sm:flex-row justify-between gap-5 xs:flex-col">
        <div className="flex flex-col md:flex-row justify-between border w-full py-3 rounded px-5 flex-wrap gap-3">
          <div>
            <h4 className="text-gray-500 capitalize"> {auth?.business?.name}</h4>
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
        {dashboardItems.map((item) => (
          <div key={item.field} className="border py-3 px-4 rounded-2xl w-full ">
            <div className="text-start">
              <p className="text-sm text-gray-600">{item.title}</p>
              <p className="text-xl font-medium">
                {/* {stats[item.totalField][item.field] } */}
                { stats?.[item.totalField] ?? 0}/{stats?.[item.field]}
              </p>
            </div>
          </div>
        ))}
      </div>

      <AddAccountModal isOpen={modal} onClose={() => setModal(false)} />
    </div>
  );
}
