import UserLayout from "@/layout/user";
import HasBack from "@/components/common/hasback/hasback";
import { useGetGroupContacts, useGetSingleGroup } from "@/providers/hooks/query/getaccount";
import { useParams } from "next/navigation";
import AccountForm from "@/components/contacts/accountcontact/accountcontact";

export default function WhatsappList() {
  const { id, groupId } = useParams() ?? {};
  const { data: group } = useGetSingleGroup(id as string, groupId as string);
  const { data: contacts } = useGetGroupContacts(id as string, groupId as string);

  return (
    <UserLayout>
      <div>
        <div className="flex flex-row gap-3">
          <HasBack hasBack={true} title={"GoBack"} />
        </div>
        <div className="mt-5 flex flex-row justify-between"></div>
        <div>
          {contacts ? (
            <AccountForm
              text={`View all contacts from this group`}
              title={group?.name}
              isGroup={true}
              contactAccount={contacts}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </UserLayout>
  );
}
