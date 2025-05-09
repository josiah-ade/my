import Link from "next/link";
import TabLists from "./tab/tabdetail";
import { useGetUsersAcount } from "@/providers/hooks/query/getaccount";
import EmptyState from "../common/empty/empty";
import { UserRoutes } from "@/core/const/routes.const";
import { MdGroups } from "react-icons/md";

interface IProps {
  isGroup?: boolean;
}

export default function PhoneList(props: IProps) {
  const { data: accounts, loading } = useGetUsersAcount();
  const connectedAccounts = accounts
    ? accounts.filter((account) => account.status.toLowerCase().includes("connected"))
    : [];
  return (
    <>
      {loading ? (
        <p>loading...</p>
      ) : connectedAccounts.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(22rem,1fr))] gap-4 mt-5">
          {connectedAccounts.map((item) => (
            <Link
              href={`${UserRoutes.CONTACTS}/${item.id}${props.isGroup ? "/group" : ""}`}
              key={item.id}
              className="border p-5 rounded-[0.6rem] w-full"
            >
              <TabLists
                icon={MdGroups}
                total={props.isGroup ? item.groups : item.contacts}
                totalKey={props.isGroup ? "groups" : ""}
                phoneNumber={item.phoneNumber}
                description={item.description}
                id={item.id}
              />
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </>
  );
}
