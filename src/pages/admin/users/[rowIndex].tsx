import Breadcrumb from "@/shared/components/breadcrumb/breadcrumb";
import Tabs from "@/shared/components/tabs/tab";
import UserLimitatedData from "@/shared/components/user/singleuser/limituserData";
import { tabs } from "@/shared/components/user/singleuser/tab";
import AdminLayout from "@/shared/layouts/admin";

export default function UserDetails() {
    return (
        <div>
            <div className="flex md:flex-row lg:flex-row sm:flex-row justify-between gap-5 xs:flex-col">
                <div className="">
                        <h4 className="text-black capitalize"> {"Ekom Inc"}</h4>
                    <Breadcrumb />
                </div>
            </div>
            <div className="mt-5">
            <UserLimitatedData />
            </div>
            <div className="mt-3">
                <Tabs tabs={tabs} />
            </div>
        </div>
    )
}
UserDetails.Layout = AdminLayout;