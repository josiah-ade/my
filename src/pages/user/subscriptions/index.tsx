import EmptyState from "@/components/common/empty/empty";
import PageHeading from "@/components/common/text/pageHeading";
import ContactSales from "@/components/subscription/contactsale";
import WeeklyPlan from "@/components/tab/subscription/weekly";
import Tabs from "@/components/tab/Tab"
import Table from "@/components/table";
import UserLayout from "@/layout/user"
import { TableHeader } from "@/typings/interface/component/table";
import { ISubScription } from "@/typings/interface/subscription";

export default function SubScriptionPage(){
    const tabs = [
        {
          label: "Weekly Subscription Plans",
          content: 
            <WeeklyPlan />
        },
        {
          label: (
            <>
              Monthly Subscription Plans 
              <span className="text-xs p-2">
                <button disabled className="text-gray-700 rounded-2xl bg-gray-100 p-1 ">
                  Coming soon
                </button>
              </span>
            </>
          ),
          content:<EmptyState />
        },
        {
          label: (
            <>
              Monthly Subscription Plans 
              <span className="text-xs p-2">
                <button disabled className="text-gray-700 rounded-2xl bg-gray-100 p-1 ">
                  Coming soon
                </button>
              </span>
            </>
          ),
          content:<EmptyState />
        },
      ];
      const headers: TableHeader<ISubScription>[] = [
        { field: "date", title: "Date" },
        { field: "package", title: "Package" },
        { field: "duration", title: "Duration",},
        { field: "expiry", title: "Expiry", },
        { field: "price", title: "Price", },
        { field: "status", title: "Status",},
      ];
      const data:ISubScription[] = [
        { date: "Date", package: "Package",  duration: "Duration", expiry: "Expiry", price: "Price",  status: "Status",},
        { date: "Date", package: "Package",  duration: "Duration", expiry: "Expiry", price: "Price",  status: "Status",},
        { date: "Date", package: "Package",  duration: "Duration", expiry: "Expiry", price: "Price",  status: "Status",},
      ];
      

    return(
        <UserLayout>
            <div>
                <PageHeading title={"Subscription Pricing"} 
                description={"Upgrade and manage your subscription"}
                 />
            </div>
            <div className="items-start justify-start">
                <Tabs tabs={tabs} justify={"justify-start"} />
            </div>
            <div>
              <ContactSales />
            </div>
            <div className="mt-5">
              <h3 className="font-bold text-[1rem] pb-5">Subscription History</h3>
              <Table headers={headers} data={data} />
            </div>
        </UserLayout>
    )
}