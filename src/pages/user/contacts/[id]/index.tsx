import UserLayout from "@/layout/user";
import HasBack from "@/components/common/hasback/hasback";
import AccountForm from "@/components/contacts/accountcontact/accountcontact";
import { useGetSingleUsersAcount, useGetUsersContactAcount } from "@/providers/hooks/query/getaccount";
import { useParams } from "next/navigation";
import EmptyState from "@/components/common/empty/empty";

export default function ContactPage() {
  const { id } = useParams() ?? {};
  const { data: accountDetails, loading: accountLoader } = useGetSingleUsersAcount(id as string, {
    loadingConfig: { displayLoader: false },
  });
  const { data: contactAcount, loading: contactLoader } = useGetUsersContactAcount(id as string);

  return (
    <UserLayout>
      <div>
        <div className="flex flex-row gap-3">
          <HasBack hasBack={true} title={"GoBack"} />
        </div>
        {accountDetails ? (
          <AccountForm
            text={`View all account from this contact`}
            title={accountDetails?.phoneNumber ?? ""}
            isGroup={false}
            contactAcount={contactAcount ?? []}
          />
        ) : (
          <>{contactLoader || accountLoader ? <></> : <EmptyState />}</>
        )}
      </div>
    </UserLayout>
  );
}
