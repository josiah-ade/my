import { useGetAccountContacts } from "@/providers/hooks/query/getaccount";
import AccountForm from "../contacts/accountcontact/accountcontact";
import { IBroadcastLists } from "@/typings/interface/broadcasts";
import EmptyState from "../common/empty/empty";
import HeaderSection from "./headerSection";

interface IProps {
  accountId: string;
  selectedList?: IBroadcastLists;
  selectedAutomationDay?: number;
}

const title = "Import WhatsApp Phone Contacts";
const text = "import contact details from your whatsapp account";

export default function Whatsapp({ accountId, selectedList, selectedAutomationDay }: IProps) {
  const { data: contactAccount, error } = useGetAccountContacts(accountId, { enabled: !!accountId });

  const emptyTitle = error
    ? "Failed to load whatsapp contacts"
    : !accountId
    ? "No Account Selected"
    : "No Whatsapp Contacts";

  const emptyText = error
    ? (error as Error).message
    : !accountId
    ? "Select a source account you are importing your contacts from to begin"
    : "You don't have any contact tos display";

  return (
    <section className="mt-20">
      {!contactAccount ? (
        <>
          <HeaderSection title={title} text={text} />
          <section>
            <EmptyState title={emptyTitle} text={emptyText} />
          </section>
        </>
      ) : (
        <section>
          <AccountForm
            title={title}
            text={text}
            titleClass="text-xl"
            selectedAutomationDay={selectedAutomationDay}
            contactAccount={contactAccount ?? []}
            addContact={false}
            selectedList={selectedList}
            btnText={`Import Contacts`}
          />
        </section>
      )}
    </section>
  );
}
