import Link from "next/link";
import UserLayout from "@/layout/user";
import HasBack from "@/components/common/hasback/hasback";
import TabLists from "@/components/contacts/tab/tabdetail";
import { useGetGroupAccount, useGetSingleUsersAcount } from "@/providers/hooks/query/getaccount";
import { useParams } from "next/navigation";
import { IGroupAccount } from "@/typings/interface/account";
import EmptyState from "@/components/common/empty/empty";

export default function WhatsappList() {
  const { id } = useParams() ?? {};
  const { data: groupAccount } = useGetGroupAccount(id as string);
  const { data: accountDetails } = useGetSingleUsersAcount(id as string);

  return (
    <UserLayout>
      <div className="flex flex-row gap-3">
        <HasBack hasBack={true} title={"GoBack"} />
      </div>
      <div className="w-full mb-20">
        <div className="mt-5">
          <h1 className="font-bold text-2xl"> {accountDetails?.phoneNumber ?? ""} </h1>
          <p className="mt-2">View all your groups for this account</p>
        </div>
        {groupAccount && groupAccount.length ? (
          <div className=" grid grid-cols-[repeat(auto-fill,minmax(22rem,1fr))] gap-4 mt-5">
            {groupAccount?.map((item: IGroupAccount) => (
              <Link
                href={`/user/contacts/${id}/group/${item.id}`}
                key={item.id}
                className="border p-5 rounded-[0.6rem] w-full"
              >
                <TabLists
                  // icon={item.icon}
                  displayTotal={false}
                  phoneNumber={item.name}
                  description={`${item.totalContacts} contacts`}
                  id={item.id}
                  // total={item.total}
                  // totaldescription={item.totaldescription}
                  // path={item.path}
                />
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </UserLayout>
  );
}
