import { whatsapplist } from "@/core/const/tab/whatsapp";
import Link from "next/link";
import TabLists from "./tab/tabdetail";
import { useGetUsersAcount } from "@/providers/hooks/query/getaccount";
import { IContact } from "@/typings/interface/account";
import EmptyState from "../common/empty/empty";

export default function WhatsAppList() {
  const { data: getaccountdata, loading } = useGetUsersAcount();
  console.log(getaccountdata);
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(22rem,1fr))] gap-4 mt-5">
      {loading ? (
    <>loading...</>
  ) : (
    getaccountdata && getaccountdata.length > 0 ? (
      getaccountdata.map((item: IContact) => (
        <Link href={`/user/contacts/whatsaplist/${item.id}`} key={item.id} className="border p-5 rounded-[0.6rem] w-full">
          <TabLists
            // icon={item.icon}
            phoneNumber={item.phoneNumber}
            description={item.description}
            id={"1"}         
            // total={item.total}
            // totaldescription={item.totaldescription}
            // path={item.path}
          />
        </Link>
      ))
    ) : (
      <EmptyState />
    )
  )}
    </div>
  );
}
