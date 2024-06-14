import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import HasBack from "@/components/common/hasback/hasback";
import TabComponent from "@/components/contacts/tab/tab";
import UserLayout from "@/layout/user";
import { IconBaseProps } from "react-icons";



export default function User() {
  return (
    <UserLayout>
      <div>
        <div className="flex flex-row gap-3">
        <HasBack hasBack={true} title={"GoBack"} />
        {/* <Breadcrumb /> */}
        </div>
        <div className="mt-5">
          <h1 className="font-bold text-2xl">Imported </h1>
          <p className="mt-2">View all your contacts here</p>
        </div>
        <div>
          <TabComponent />
        </div>
      </div>
    </UserLayout>
  );
}