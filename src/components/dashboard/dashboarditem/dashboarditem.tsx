import { dashboardItem } from "@/core/const/dashboard.consr";
import { dashboard } from "@/typings/interface/component/layout/menu";
import { IoAddSharp } from "react-icons/io5";
import DashBoardAction from "./dashboardactons";

export default function DashBoardItems() {
  return (
    <div>
      <div className="flex md:flex-row lg:flex-row sm:flex-row justify-between gap-5 xs:flex-col">
        <div className="flex flex-col md:flex-row justify-between border w-full py-3 rounded px-5 flex-wrap gap-3">
          <div>
            <h4 className="text-gray-500">Sammys Luxe Store</h4>
            <h3 className="font-bold text-2xl">Free Plan</h3>
          </div>
          <div className="flex justify-end">
            <button className="bg-primary h-fit text-white rounded-2xl px-5 py-2 text-center text-md">Upgrade</button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between border w-full py-3 rounded px-5 flex-wrap gap-3">
          <div>
            <h4 className="text-gray-500">Accounts</h4>
            <h3 className="font-bold">+234 567 899 4212</h3>
          </div>
          <div className="flex justify-end">
            <button className="bg-primary h-fit text-white rounded-2xl text-center text-md px-7 py-2">
              <span className="text-xl mr-2">+</span> Add Account
            </button>
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
    </div>
  );
}
