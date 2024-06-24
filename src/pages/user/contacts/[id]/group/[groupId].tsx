import UserLayout from "@/layout/user";
import HasBack from "@/components/common/hasback/hasback";
import {
  useGetSingleGroupContact,
} from "@/providers/hooks/query/getaccount";
import { useParams } from "next/navigation";
import { ContactAccount, } from "@/typings/interface/account";
import AccountForm from "@/components/contacts/accountcontact/accountcontact";

export default function WhatsappList() {
  const { id, groupId  } = useParams() ?? {};
 const{data: SingleGroupContact}=useGetSingleGroupContact(id as string, groupId as string)

const contacts:ContactAccount[] = SingleGroupContact?.map((item)=>({
  phoneNumber:item.phoneNumber ?? "",
  name:item.rank
})) ?? []

  return (
    <UserLayout>
      <div>
        <div className="flex flex-row gap-3">
          <HasBack hasBack={true} title={"GoBack"} />
        </div>
        <div className="mt-5 flex flex-row justify-between">
        </div>
        <div>
        {contacts ? <AccountForm text={`View all account from this contact`} title={""} isGroup={true} contactAcount={contacts} /> : <></>}
        </div>
      </div>
    </UserLayout>
  );
}
